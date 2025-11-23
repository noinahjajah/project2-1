import React from 'react';
import './JobList.css';
import Searchbar from '../component/searchbar';
import { useJobs } from '../context/JobsContext';

const columns = [
  { key: 'new', title: 'New Jobs', color: '#4785FC' },
  { key: 'in_progress', title: 'On Progress', color: '#78ff53ff' },
  { key: 'rejected', title: 'Reject', color: '#ffdc43ff' },
  { key: 'done', title: 'Done', color: '#00ffddff' },
  { key: 'canceled', title: 'Canceled', color: '#ff0026ff' },
];

export default function JobList() {
  const { jobs } = useJobs();

  return (
    <>
      <div className=" mb-lg-4">
        <Searchbar />
      </div>
      <section className="joblist-board">
        <div className="board-header">
          <div>
            <p className="board-eyebrow">Overview</p>
            <h1 className="board-title">Joblist</h1>
          </div>
          <button className="add-job-btn">+ Add new job</button>
        </div>
        <div className="job-columns">
          {columns.map((column) => {
            const jobsByStatus = jobs.filter((job) => job.status === column.key);
            return (
              <div className="job-column" key={column.key}>
                <div className="job-column-head">
                  <div>
                    <p className="job-column-label">{column.title}</p>
                    <p className="job-column-count">{jobsByStatus.length} positions</p>
                  </div>
                  <div className="job-column-dot" style={{ background: column.color }} />
                </div>
                <div className="job-column-cards">
                  {jobsByStatus.map((job) => (
                    <article className="job-card" key={job.id}>
                      <div className="job-card-dot" />
                      <div className="job-card-body">
                        <p className="job-card-title">{job.id}</p>
                        <p className="job-card-title">{job.title}</p>
                        <p className="job-card-desc">{job.desc}</p>
                        <div className="job-card-meta">
                          <span className="job-card-badge">{job.badge}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
