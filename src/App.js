import React, { useEffect, useState } from 'react';
import ApiClient from './api/api';
import Service from './components/Service';
import './App.css';

function App() {
  const api = new ApiClient();

  const [services, setServices] = useState();
  const [servicesLogs, setServicesLogs] = useState();
  const [servicesMapped, setServicesMapped] = useState({});

  const fetchData = async () => {
    try {
      const serviceResponse = await api.getAllServices();
      setServices(serviceResponse.data);

      const servicesLogsResponse = await api.getAllServicesLogs();
      setServicesLogs(servicesLogsResponse.data);

      let servicesMappedToSet = {};

      serviceResponse.data.map((service) => {
        const { id, name } = service;
        const appropriateLogs = servicesLogsResponse.data.filter((serviceLog) => {
          // speed this up by removing the current element because it was already assigned
          if (serviceLog.service_id === id) {
            return serviceLog;
          }
        });

        servicesMappedToSet = {
          ...servicesMappedToSet,
          [id]: { id, name, logs: appropriateLogs }
        }
      });

      setServicesMapped(servicesMappedToSet);
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const renderServices = () => {
    if (!services || !servicesMapped) return;

    return services.map((service) => {
      const { id, name } = service;
      const { logs } = servicesMapped[id] ? servicesMapped[id] : {};
      const props = {
        ...service,
        logs: logs ? logs : []
      };
      return <Service key={`${id}-${name}`} {...props} />;
    });
  }

  return (
    <div className="App container pt-5">
      <div className="row">
        {renderServices()}
      </div>
    </div>
  );
}

export default App;
