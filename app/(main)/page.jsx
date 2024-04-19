"use client";

import React, { useEffect, useState } from "react";
import Stats from "./Components/stats";
import RequestTable from "./Components/requestTable";
import { getStats } from "@/supabase/apis/dashboard";
import { Spinner2 } from "@/Components/spinner";

const Home = () => {
  const [stats, setstats] = useState([]);
  const [requests, setrequests] = useState([]);
  const [loading, setloading] = useState(false);
  const statsRecords = async () => {
    setloading(true);
    let res = await getStats();
    if (res.status) {
      console.log(res.records);
      setrequests(res.records.requests);
      setstats(res.records.stats);
      setloading(false);
    } else {
      setloading(false);
    }
  };

  useEffect(() => {
    statsRecords();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-[calc(100vh-182px)] w-[100%]">
          <Spinner2 color="model" />
        </div>
      ) : (
        <div>
          <Stats stats={stats} />
          <RequestTable requests={requests} />
        </div>
      )}
    </div>
  );
};

export default Home;
