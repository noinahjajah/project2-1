import React from 'react';
import './JobList.css';
import Searchbar from '../component/searchbar';
import joblistLogo from '../../pic/joblist-logo.png';

const jobStatus = [
  { title: 'New Jobs', color: '#4785FC' },
  { title: 'On Progress', color: '#f8eefe' },
  { title: 'Reject', color: '#fff9df' },
  { title: 'Done', color: '#eafaf1' },
  { title: 'Canceled', color: '#ffe5e9' },
];


const jobs = [
  {
    status: 'New Jobs',
    items: Array(4).fill({
      title: 'Product Designer',
      desc: 'Behance - Remote',
      badge: 'Urgent',
    }),
  },
  {
    status: 'On Progress',
    items: Array(4).fill({
      title: 'React Developer',
      desc: 'Tech Labs - Hybrid',
      badge: 'Interview',
    }),
  },
  {
    status: 'Reject',
    items: Array(4).fill({
      title: 'QA Engineer',
      desc: 'Growth Inc - Remote',
      badge: 'Feedback',
    }),
  },
  {
    status: 'Done',
    items: Array(4).fill({
      title: 'Backend Lead',
      desc: 'Finix - Onsite',
      badge: 'Offer',
    }),
  },
  {
    status: 'Canceled',
    items: Array(4).fill({
      title: 'UI Specialist',
      desc: 'Folio Tech - Hybrid',
      badge: 'Hold',
    }),
  },
];

export default function JobList() {
  return (
    <>
    <div className=' mb-lg-4'>
    <Searchbar />
    </div>
    <section className="joblist-board">
    
      <div className="board-header">
        <div className="board-title-group">
          <img src={joblistLogo} alt="Joblist logo" className="board-logo" />
          <div>
            <p className="board-eyebrow">Overview</p>
            <h1 className="board-title">Joblist</h1>
          </div>
        </div>
        <button className="add-job-btn">+ Add new job</button>
      </div>
      <div className="job-columns">
        {jobStatus.map((status, idx) => (
          <div className="job-column" key={status.title}>
            <div className="job-column-head">
              <div>
                <p className="job-column-label">{status.title}</p>
                <p className="job-column-count">{jobs[idx].items.length} positions</p>
              </div>
              <div className="job-column-dot" style={{ background: status.color }} />
            </div>
            <div className="job-column-cards">
              {jobs[idx].items.map((job, i) => (
                <article className="job-card" key={`${status.title}-${i}`}>
                  <div className="job-card-dot" />
                  <div className="job-card-body">
                    <p className="job-card-title">{job.title}</p>
                    <p className="job-card-desc">{job.desc}</p>
                    <div className="job-card-meta">
                      <span className="job-card-badge">{job.badge}</span>
                      <span className="job-card-meta-text">23 candidates</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
     </>
  );
}
