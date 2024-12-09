import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PacmanLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import useFetch from '@/hooks/use-fetch';
import { UrlState } from '@/context';
import { getUrls } from '@/utils/apiUrls';
import { getClicksForUrls } from '@/utils/apiClicks';
import Error from '@/components/Error';
import UrlResponse from '@/models/UrlResponse';
import LinkCard from '@/components/LinkCard';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUrls, setFilteredUrls] = useState<UrlResponse[]>([]);

  const { user } = UrlState();
  // call the getUrls function to fetch the user's urls
  const {
    data: urls,
    loading,
    error,
    fn: fnGetUrls,
  } = useFetch(() => getUrls(user?.id));
  // call the getClicksForUrls function to fetch the user's clicks
  const {
    data: clicks,
    loading: clicksLoading,
    error: clicksError,
    fn: fnGetClicksForUrls,
  } = useFetch(() => getClicksForUrls(urls ? urls?.map((url) => url.id) : []));

  useEffect(() => {
    fnGetUrls();
  }, []);

  useEffect(() => {
    if (urls && urls.length > 0) {
      fnGetClicksForUrls();
    }
    setFilteredUrls(
      urls?.filter((url) =>
        (url?.original_url ?? '')
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ) || []
    );
  }, [urls]);

  return (
    <div>
      {loading || clicksLoading ? (
        <div className="flex justify-center items-center h-screen">
          <PacmanLoader color="#36d7b7" size={50} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 mt-5">
            <Card>
              <CardHeader>
                <CardTitle>Links Created</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{urls?.length}</p>
              </CardContent>
              {/* error during fetching urls */}
              {error && <Error message={error?.message} />}
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Clicks</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{clicks?.length}</p>
              </CardContent>
              {/* error during fetching clicks */}
              {clicksError && <Error message={clicksError?.message} />}
            </Card>
          </div>

          <div className="flex justify-between mt-5">
            <h1 className="text-3xl font-extrabold">My Links</h1>
            <Button>Create Link</Button>
          </div>

          <div className="relative mt-5">
            <Input
              type="text"
              placeholder="Search for links..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Filter className="absolute top-0 right-2 p-1 w-10 h-10" />
          </div>
          {
            // Display the filtered urls
            filteredUrls.map((url) => (
              <LinkCard key={url.id} url={url} fnGetUrls={fnGetUrls} />
            ))
          }
        </>
      )}
    </div>
  );
};

export default Dashboard;
