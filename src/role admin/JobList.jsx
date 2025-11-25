import React, { useRef, useState } from 'react';
import './JobList.css';
import Searchbar from '../component/searchbar';
import { useJobs } from '../context/JobsContext';
import { useNavigate } from 'react-router-dom';

const columns = [
  { key: 'new', title: 'New Jobs', color: '#4785FC', hover: '#4785FC' },
  { key: 'in_progress', title: 'On Progress', color: '#ac7cf8', hover: '#ac7cf8' },
  { key: 'rejected', title: 'Reject', color: '#fec667', hover: '#fec667' },
  { key: 'done', title: 'Done', color: '#019b5f', hover: '#019b5f' },
  { key: 'canceled', title: 'Canceled', color: '#fe5b48', hover: '#fe5b48' },
];

export default function JobList() {
  const { jobs } = useJobs();
  const navigate = useNavigate();
  const [hoveredJob, setHoveredJob] = useState(null);
  const hoverTimer = useRef(null);

  const handleHoverStart = (job, color) => {
    hoverTimer.current = setTimeout(() => {
      setHoveredJob({ ...job, color });
    }, 500);
  };

  const handleHoverEnd = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }
    hoverTimer.current = null;
    setHoveredJob(null);
  };

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
                    <article
                      className="job-card"
                      key={job.id}
                      style={{ '--card-hover': column.hover, '--card-border': column.color }}
                      onMouseEnter={() => handleHoverStart(job, column.color)}
                      onMouseLeave={handleHoverEnd}
                    >
                      {/* <div className="job-card-dot" /> */}
                      <div className="job-card-body">
                        <p className="job-card-title">{job.id}</p>
                        <p className="job-card-title">{job.title}</p>
                        <p className="job-card-desc">{job.desc}</p>
                        <div className="job-card-meta">
                          <span className="job-card-badge">{job.badge}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="job-card-link"
                        onClick={() => navigate(`/admin/job/${encodeURIComponent(job.id)}`)}
                      >
                      </button>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {hoveredJob && (
          <div className="job-hover-detail" style={{ borderColor: hoveredJob.color }}>
            <div className="job-hover-header">Detail</div>
            <div className="job-hover-body">
              <p className="job-hover-title">{hoveredJob.title}</p>
              <p className="job-hover-desc">
                {hoveredJob.desc || 'Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very short story.'}
              </p>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
