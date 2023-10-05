import React from "react";
import { useGetGroupsQuery } from "./groupsApiSlice";
import { useEffect, useState } from "react";
import Group from "./Group";

const GroupList = () => {
  const {
    data: groups,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetGroupsQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [isVisible, setIsVisible] = useState(" ");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsVisible(" visible");
  }, [isSuccess, isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, [isSuccess]);

  useEffect(() => {
    setIsMounted(false);
  }, [isLoading, isFetching]);

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) content = <p className="errmsg">{error?.data?.message}</p>;

  if (isSuccess) {
    const { ids } = groups;

    const tableContent = ids?.length
      ? ids.map((groupId) => <Group key={groupId} groupId={groupId}></Group>)
      : null;

    content = (
      <>
        <h2 id="dash-header" className={`${isVisible}`}>
          Group Info
        </h2>
        <table
          id={"table--group-info"}
          className={`table table--groups ${isVisible}`}
        >
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th group__status">
                Family/Group ID
              </th>
              <th scope="col" className="table__th group__username">
                Owner
              </th>
              <th scope="col" className="table__th group__username">
                Owner Email
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </>
    );
  }

  return content;
};

export default GroupList;
