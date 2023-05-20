import React from "react";

export const apiResultInput = {
    "user_auth_token":"b7a6d7c04d04c442dabfde6e1da16466"
    ,"api_name":"ServicesCustomResultsGet"
    ,"report_id":"35"
    ,"GroupBy":""
    ,"AggregateBy":"" 
    ,"SortBy":""
    ,"PageSize":"10"
    ,"StartIndex":"0"
    ,"hirarchy_users":""
    ,"extra_search_text":"" 
    ,"return_info":"1"
    ,"filter_id":"0"
    ,"view_id":"0"
    }

export const charts = ['Line','Bar','Column','Area','Pie','Scatter'];

export const options = {
    chart:{
        type:'line'
    },
    title: {
        text: ` chart example`
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        stackLabels: {
        enabled: true,
        }
    },
    yAxis: {
        title: {
        text: 'Value'
        },
        stackLabels: {
        enabled: true,
        }
    },
    plotOptions: {
        series: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series: [{
        name: 'leads',
        data: [10, 20, 15, 25, 30, 35, 40, 45, 50, 55, 60, 65],
        Animation:false
    },{
        name: 'deals',
        data: [3, 2, 5, 8, 10, 6, 3, 4, 5, 5, 6, 5],
        Animation:false
        }]
    };
export default options;