import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import StreamData from '@/models/StreamData';
import Release from '@/models/Release';
import Artist from '@/models/Artist';
import mongoose from 'mongoose';

/**
 * GET /api/analytics
 * Get analytics data with various filters
 */
export async function GET(request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const release = searchParams.get('release');
    const artist = searchParams.get('artist');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    
    // Build query
    const query = {};
    
    // Filter by release
    if (release && mongoose.Types.ObjectId.isValid(release)) {
      query.releaseId = new mongoose.Types.ObjectId(release);
    }
    
    // Filter by artist - need to find all releases by this artist first
    if (artist && mongoose.Types.ObjectId.isValid(artist)) {
      const artistReleases = await Release.find({
        artists: mongoose.Types.ObjectId(artist)
      }).select('_id').lean();
      
      const releaseIds = artistReleases.map(r => r._id);
      
      if (releaseIds.length > 0) {
        query.releaseId = { $in: releaseIds };
      } else {
        // If artist has no releases, return empty result
        return NextResponse.json({
          analytics: [],
          recentReports: [],
          artists: []
        });
      }
    }
    
    // Date filtering
    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = new Date(from);
      if (to) query.date.$lte = new Date(to);
    }
    
    // Get total streams per release - use the latest report data for each release
    // LANDR reports provide lifetime totals, so we want the latest data point
    const streamSummary = await StreamData.aggregate([
      { $match: query },
      { $sort: { date: -1 } },
      {
        $group: {
          _id: '$releaseId',
          latestData: { $first: '$$ROOT' },
          totalStreams: { $max: '$streams.count' }, // Use max to get the latest lifetime total
          totalDownloads: { $max: '$downloads.count' }, // Use max for downloads too
          latestDate: { $max: '$date' },
        }
      },
      { $sort: { totalStreams: -1 } },
      { $limit: limit }
    ]);
    
    // Get release details
    const releaseIds = streamSummary.map(item => item._id);
    const releases = await Release.find({
      _id: { $in: releaseIds }
    }).select('title slug coverImage artists').populate('artists', 'name slug').lean();
    
    // Create a lookup map for releases
    const releaseMap = {};
    releases.forEach(release => {
      releaseMap[release._id.toString()] = release;
    });
    
    // Merge data
    const analyticsData = streamSummary.map(item => {
      const releaseId = item._id.toString();
      const release = releaseMap[releaseId] || {};
      
      return {
        releaseId,
        title: release.title || 'Unknown Release',
        slug: release.slug || '',
        coverImage: release.coverImage || '',
        artists: release.artists || [],
        totalStreams: item.totalStreams,
        totalDownloads: item.totalDownloads,
        latestDate: item.latestDate,
        latestData: {
          streams: item.latestData.streams,
          downloads: item.latestData.downloads,
        }
      };
    });
    
    // Get last 5 report dates
    const recentReports = await StreamData.aggregate([
      { $sort: { date: -1 } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } } } },
      { $limit: 5 },
      { $sort: { _id: -1 } }
    ]);
    
    // Get all artists who have releases with streaming data
    const artistsWithData = await Artist.aggregate([
      { 
        $lookup: {
          from: 'releases',
          localField: '_id',
          foreignField: 'artists',
          as: 'releases'
        }
      },
      {
        $match: {
          'releases': { $ne: [] }
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          releaseCount: { $size: '$releases' }
        }
      },
      { $sort: { name: 1 } }
    ]);
    
    return NextResponse.json({
      analytics: analyticsData,
      recentReports: recentReports.map(r => r._id),
      artists: artistsWithData
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data', message: error.message },
      { status: 500 }
    );
  }
} 