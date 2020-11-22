import React, { Fragment } from 'react';
import axios from 'axios';
import './home.css';
import BackdropLoader from '../Shared/Loader';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.launchYears = [
      '2006',
      '2007',
      '2008',
      '2009',
      '2010',
      '2011',
      '2012',
      '2013',
      '2014',
      '2015',
      '2016',
      '2017',
      '2018',
      '2019',
      '2020',
    ];

    this.launchAndLanding = ['true', 'false'];
  }

  state = {
    programs: [],
    launchSuccess: '',
    landsuccess: '',
    launchYear: '',
  };

  componentDidMount() {
    this.getSpacexPrograms();
  }

  getSpacexPrograms = (launchSucc = '', landsucc = '', launchYr = '') => {
    this.setState({ programs: [] });
    let programApi = `https://api.spaceXdata.com/v3/launches?limit=100`;
    if (launchSucc.length) {
      this.setState({ launchSuccess: launchSucc });
      programApi = programApi + `&launch_success=${launchSucc}`;
    }
    if (landsucc.length) {
      this.setState({ landsuccess: landsucc });
      programApi = programApi + `&land_success=${landsucc}`;
    }
    if (launchYr.length) {
      this.setState({ launchYear: launchYr });
      programApi = programApi + `&launch_year=${launchYr}`;
    }
    axios.get(programApi).then((res) => {
      this.setState({ programs: res.data });
    });
  };

  resetFilter = () => {
    this.setState({ launchSuccess: '', landsuccess: '', launchYear: '' });
    this.getSpacexPrograms();
  };

  getSeparator = (title) => (
    <div className='my-3'>
      <p className='mb-2 text-center'>{title}</p>
      <hr className='m-0' />
    </div>
  );

  render() {
    const { programs, launchSuccess, landsuccess, launchYear } = this.state;

    return (
      <Fragment>
        {programs ? (
          <div className='main-container'>
            <div className='header font-weight-bold'>
              SpaceX Launch Programs
            </div>
            <div className='home-container'>
              <div className='left-nav mt-3 p-3'>
                <h4 className='title-header text-left font-weight-bold'>
                  Filters
                </h4>
                <button
                  type='button'
                  className='btn btn-info w-100'
                  onClick={this.resetFilter}
                >
                  Reset Filters
                </button>
                {this.getSeparator('Launch Year')}
                <div className='row m-0'>
                  {this.launchYears.map((year) => (
                    <div
                      className='col-6 my-2 text-center'
                      onClick={() => {
                        this.getSpacexPrograms(
                          launchSuccess,
                          landsuccess,
                          year
                        );
                      }}
                    >
                      <div className='rounded filter-text'>{year}</div>
                    </div>
                  ))}
                </div>
                {this.getSeparator('Successful Launch')}
                <div className='row m-0'>
                  {this.launchAndLanding.map((val) => (
                    <div
                      className='col-6 py-2 text-center'
                      onClick={() => {
                        this.getSpacexPrograms(val, landsuccess, launchYear);
                      }}
                    >
                      <div className='rounded filter-text'>{val}</div>
                    </div>
                  ))}
                </div>
                {this.getSeparator('Successful Landing')}
                <div className='row m-0'>
                  {this.launchAndLanding.map((val) => (
                    <div
                      className='col-6 py-2 text-center'
                      onClick={() => {
                        this.getSpacexPrograms(launchSuccess, val, launchYear);
                      }}
                    >
                      <div className='rounded filter-text'>{val}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='main'>
                <ul className='cards'>
                  {programs.length !== 0 ? (
                    programs.map((item, index) => (
                      <li className='cards_item' key={index}>
                        <div className='card'>
                          <div className='card_image'>
                            <img src={item.links.mission_patch} alt='missing' />
                          </div>
                          <div className='card_content'>
                            <h5 className='card_title font-weight-bold'>
                              {' '}
                              {item.mission_name} #{item.flight_number}
                            </h5>
                            <p className='card_text'>
                              <div className='row '>
                                <div className='col-12'>
                                  <span className='card-subtitle font-weight-bold'>
                                    Mission Ids:{' '}
                                  </span>
                                  <ul className='m-0'>
                                    {item.mission_id.map((id, index) => (
                                      <li key={index}>{id}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div className='col-12'>
                                  <span className='card-subtitle font-weight-bold'>
                                    Launch Year:{' '}
                                  </span>
                                  {item.launch_year}
                                </div>
                                <div className='col-12'>
                                  <span className='card-subtitle font-weight-bold'>
                                    Successful Launch:{' '}
                                  </span>
                                  {!item.launch_success ? 'false' : 'true'}
                                </div>
                                <div className='col-12'>
                                  <span className='card-subtitle font-weight-bold'>
                                    Successful Landing:{' '}
                                  </span>
                                  {item.rocket &&
                                  item.rocket.first_stage &&
                                  item.rocket.first_stage.cores &&
                                  item.rocket.first_stage.cores[0] &&
                                  item.rocket.first_stage.cores[0].land_success
                                    ? !item.rocket.first_stage.cores[0]
                                        .land_success
                                      ? 'false'
                                      : 'true'
                                    : ''}
                                </div>
                              </div>
                            </p>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <div className='noDataFound'>Loading..</div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <BackdropLoader open />
        )}
      </Fragment>
    );
  }
}

export default Home;
