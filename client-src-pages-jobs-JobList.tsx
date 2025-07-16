import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Pagination } from '@mui/material';
import JobCard from '../../components/jobs/JobCard';
import Filters from '../../components/jobs/Filters';
import { getJobs } from '../../api/jobs';
import { Job } from '../../types/job';

const JobListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const { data, isLoading, error } = useQuery(
    ['jobs', page, filters],
    () => getJobs({ page, ...filters }),
    { keepPreviousData: true }
  );

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setFilters(params);
    setPage(params.page ? parseInt(params.page) : 1);
  }, [searchParams]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setSearchParams({ ...filters, page: value.toString() });
  };

  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
    setSearchParams({ ...newFilters, page: '1' });
    setPage(1);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading jobs</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Filters filters={filters} onFilterChange={handleFilterChange} />
      
      <Box sx={{ mt: 3 }}>
        {data?.jobs?.length ? (
          <>
            {data.jobs.map((job: Job) => (
              <JobCard key={job._id} job={job} />
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                count={data.totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </>
        ) : (
          <Typography>No jobs found</Typography>
        )}
      </Box>
    </Box>
  );
};

export default JobListPage;