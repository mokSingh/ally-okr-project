import $ from 'jquery';

/**
 * type definition of OkrRecord
 */
export interface OkrRecord {
  id: string;
  category: string;
  title: string;
  metric_name: string;
  metric_start: string;
  metric_target: string;
  parent_objective_id: string;
  archived: string;
}

/**
 * Type definition of Processed Data
 */
export interface ProcessData extends OkrRecord {
  children: Array<OkrRecord>;
}

/**
 * Type of return type of function processOkrData
 */
export interface ProcessRecordAndFilter {
  data: Array<ProcessData>;
  filters: Array<string>;
}

/**
 * Process data from API and create parent/child relationship
 * Each OkrRecordParent will have children
 * complexity O(n) => n is number of records
 * @param okrRecords
 */
export const processOkrData = (okrRecords: Array<OkrRecord>): ProcessRecordAndFilter => {
  const processData: { [key: string]: ProcessData } = {};
  const filterSet = new Set<string>();
  /** Iteratee over the records to create parent/child */
  okrRecords.forEach(okrRecord => {
    /** if => If objective id is empty then its a parent and add children property */
    /** else if => If objective id still not exists, create one */
    /** else  => Its definitely a child now */
    if (okrRecord.parent_objective_id === '') {
      processData[okrRecord.id] = { ...okrRecord, children: [] };
    } else if (!processData[okrRecord.parent_objective_id]) {
      processData[okrRecord.parent_objective_id] = { ...okrRecord, children: [] };
    } else {
      processData[okrRecord.parent_objective_id].children.push(okrRecord);
    }
    filterSet.add(okrRecord.category);
  });
  /** Return both processed data and filer in go , no need of iterating again, we already looped once */
  return { data: Object.values(processData), filters: Array.from(filterSet) };
};

/**
 * Fetch and process data from Ally Okr
 * @param url
 */
export const fetchDataFromAlly = async (url: string) => {
  const response = await $.ajax(url);
  return processOkrData(response.data);
};

/**
 * Filter data as per filter name applied on category
 * @param filter
 * @param data
 */
export const filterData = (filter: string, data: Array<ProcessData>) => {
  const filterParent = data.filter(dat => dat.category === filter);
  return filterParent;
};
