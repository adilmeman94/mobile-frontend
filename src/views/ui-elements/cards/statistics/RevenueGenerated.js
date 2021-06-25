import { useEffect, useState } from 'react'
import axios from 'axios'
import { CreditCard } from 'react-feather'
import StatsWithAreaChart from '../../../../components/widgets/stats/StatsWithAreaChart'
import { DashBoard } from '../../../../services/api.service'
import { TrendingUp } from 'react-feather'

const RevenueGenerated = ({ kFormatter, success }) => {
  const [data, setData] = useState(null)
  const [dataList, setDataList] = useState([])
  const [showLoader, setShowLoader] = useState(false);
  // const SaleCount = async () => {
  //     setShowLoader(true);
  //   try {
  //     const datas = await DashBoard.getSaleCount();
  //     console.log(datas);
  //     setDataList(datas);
  //     console.log(dataList);
  //   } catch (ex) {
  //     console.log(ex);
  //   } finally {
  //     setShowLoader(false);
  //   }
  // };
  const options = {
    chart: {
      id: 'revenue',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },
    grid: {
      show: false
    },
    colors: [success],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2.5
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.9,
        opacityFrom: 0.7,
        opacityTo: 0.5,
        stops: [0, 80, 100]
      }
    },

    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    tooltip: {
      x: { show: false }
    }
  }

  useEffect(() => {
    axios.get('/card/card-statistics/revenue').then(res => setDataList(res.data))
    // SaleCount();
  }, [])

  return data !== null ? (
    <StatsWithAreaChart
      icon={<TrendingUp size={21} />}
      color='success'
      stats={kFormatter(data.analyticsData.revenue)}
      statTitle='Revenue Generated'
      options={options}
      series={data.series}
      type='area'
    />
  ) : null
}
export default RevenueGenerated
