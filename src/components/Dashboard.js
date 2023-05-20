import React,{Component, useEffect, useState} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import options, {charts, apiResultInput} from '../config';

function Dashboard(){

    const [chartType, setChartType] = useState('line');
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [APIResponse, setAPIResponse] = useState(false);
    
    useEffect(()=>{
      ChartTypes();
    },[chartType]);
      
    function handleDropdownChange(event){
        setChartType(event.target.attributes.getNamedItem('value').value.toLowerCase());
    }
    const ChartName = (props) => {
      return (props) ? (
        <li href="#" className={(chartType == props.chart.toLowerCase())?'list-group-item active  w-100':' w-100 list-group-item'} 
          value={props.chart} onClick={handleDropdownChange}>{props.chart}</li>
      ):'';
    }
    const ChartTypes = ()=> {
      return (<ul className="list-unstyled list-group w-100" onChange={handleDropdownChange} >
                {charts.map((chart, index) => <ChartName key={index} chart={chart} />)}
              </ul>);
    };

    const RenderHighChart = () => {
      let opts = options;
        opts.chart.type = chartType;
        opts.title.text = `${chartType} chart`;
      return (<HighchartsReact highcharts={Highcharts} options={opts}></HighchartsReact>);
    }
    const openSettings = async () => {
      debugger;
      const apiInput = {
        
      }
      try{
        const response = await fetch("https://feature18.office24by7.in/v1/common/generic/getgenericsp",
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(apiResultInput)
        });
        debugger;
        if (response.ok) {
          debugger;
          // setSubmitSuccess(true);
          // setError(null);
        } else {
          const errorData = await response.json();
          // setError(errorData.message);
        }
      } catch (error) {
        console.log(`An error occurred while submitting the form: ${error}`);
      }

      setIsSideBarOpen(!isSideBarOpen);
    }
    //return 'This is a dashboard page!';
    return (

        <div className="container-fluid">
          {/* Settings overlay */}
          <div className="offcanvas offcanvas-end" id="settings">
            <div className="offcanvas-header bg-primary text-white">
              <h1 className="offcanvas-title">Settings</h1>
              <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
            </div>
            <div className="offcanvas-body">
              <p>Settings here...</p>
              <button className="btn btn-secondary" type="button">A Button</button>
            </div>
          </div>
          
          {/* Header */}
          <div className="row">
            <div className="col-lg-11"><h1 className='text-center'>Dashboard</h1>
              <h1>&nbsp;</h1>&nbsp;
            </div>
            <div className='col-lg-1'>
            <h1>
              <input type="button" value="Settings" onClick={openSettings} className="btn btn-primary"
                  data-bs-toggle="offcanvas" data-bs-target="#settings"></input>
            </h1>
            </div>
          </div>
          {/* Content panel */}
          <div className="row align">
              <div className="col-lg-2">
                <ChartTypes />
              </div>
              <div className="col-lg-10" >
                  <RenderHighChart />
              </div>
          </div>
            
            
            
        </div>

    );
}
export default Dashboard;