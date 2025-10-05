import classes from '../../styles/ProgressBar.module.css'

const ProgressBar = ({ value, max }) => {
  const percentage = (value / max) * 100;

  return (
    <>
      <div className={classes.progress}>
        <div
          className={classes.progressBar}
          role="progressbar"
          style={{ width: `${percentage}%` }}
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
        </div>
      </div>
      <div className='d-flex justify-content-between'>
        <p className="numbers-subtitle">${value}</p>
        <p className="numbers-subtitle">${max}</p>
      </div>
    </>
  );
};

export default ProgressBar;