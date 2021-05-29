import React, { useEffect, useState } from 'react';
import './App.css';
import { ParentObjective } from '../components/ParentObjective';
import { fetchDataFromAlly, ProcessData, filterData } from '../utils/Utils';

/**
 * Parent container APP which gets rendered in root
 */
const App = () => {
  /** Set processed data from Okr */
  const [processedData, setProcessedData] = useState([] as Array<ProcessData>);
  /** Set Filters category from Okr */
  const [filters, setFilters] = useState([] as Array<string>);
  /** Set Filters Data as per category from Okr */
  const [filteredOkrData, setFilteredOkrData] = useState([] as Array<ProcessData>);
  /** Set Loader value when data is fetched */
  const [showLoader, setShowLoader] = useState(false);
  /** Set Error in case API fails */
  const [errorOccur, setErrorOccur] = useState(false);
  /** API URL ideally should go in .env file */
  const URL = 'https://okrcentral.github.io/sample-okrs/db.json';

  /**
   * fetchData from Okr and update corresponding states
   * like setting processed Data, filters, loaders
   */
  const fetchData = () => {
    setShowLoader(true);
    fetchDataFromAlly(URL)
      .then(dataFromAlly => {
        setProcessedData(dataFromAlly.data);
        setFilters(dataFromAlly.filters);
        setFilteredOkrData(dataFromAlly.data);
        setShowLoader(false);
      })
      .catch(error => {
        console.log(error);
        setErrorOccur(true);
        setShowLoader(false);
      });
  };

  /**
   * Hook to fetch content and process data only once when the app loads
   */
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * callback function to be called when filter is changed
   * By default filter will be "ALL" which is equivalent to no filter
   * @param event
   */
  const onFilter = (event: React.FormEvent<HTMLSelectElement>) => {
    if (event.currentTarget.value === 'All') {
      setFilteredOkrData(processedData);
    } else {
      const filteredData = filterData(event.currentTarget.value, processedData);
      setFilteredOkrData(filteredData);
    }
  };
  return (
    <>
      {/** Showing/ Hiding loader as per API status */}
      {showLoader ? (
        <div className="loader" />
      ) : (
        <>
          {/** Showing error image in case of error */}
          {errorOccur ? (
            <img className="error-image" src="../../assets/error.png" alt="Something went wrong" />
          ) : (
            <>
              {/** Showing ally header with filters and content */}
              <header className="header">
                <img src="https://ally.io/wp-content/themes/sightbox/assets/images/logo.svg" alt="Ally.io" />
                <span className="filter">Filter by Category:</span>
                <select className="select-filter" id="filter" name="category" onChange={event => onFilter(event)}>
                  <option value="All">All</option>
                  {filters.map(filter => (
                    <option key={`filter-by-${filter}`} value={filter}>
                      {filter}
                    </option>
                  ))}
                </select>
              </header>
              {/** Creating Okr Objective */}
              {filteredOkrData.map((okrData, index) => {
                return (
                  <ParentObjective
                    key={`parent_${okrData.id}`}
                    bullet={index + 1}
                    title={okrData.title}
                    childObjectives={okrData.children}
                  />
                );
              })}{' '}
            </>
          )}
        </>
      )}
    </>
  );
};

export default App;
