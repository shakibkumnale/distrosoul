// src/app/admin/page.jsx
import { Suspense } from 'react';
import DashboardStats from '@/components/admin/DashboardStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Download } from 'lucide-react';

export const metadata = {
  title: 'Admin Dashboard | Soul Distribution',
  description: 'Manage your music distribution platform',
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            Last 30 days
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      <Suspense fallback={<div>Loading stats...</div>}>
        <DashboardStats />
      </Suspense>

      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Recent Releases</TabsTrigger>
          <TabsTrigger value="popular">Popular Artists</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Releases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Loading recent releases...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="popular" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Popular Artists</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Loading popular artists...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}