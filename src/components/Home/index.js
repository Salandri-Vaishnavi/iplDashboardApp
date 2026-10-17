import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    teamsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    try {
      const response = await fetch('https://apis.ccbp.in/ipl')
      const data = await response.json()

      const updatedTeamsList = data.teams.map(eachTeam => ({
        id: eachTeam.id,
        name: eachTeam.name,
        teamImageUrl: eachTeam.team_image_url,
      }))

      this.setState({
        teamsList: updatedTeamsList,
        apiStatus: apiStatusConstants.success,
      })
    } catch (error) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderTeams = () => {
    const {teamsList} = this.state

    return (
      <>
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="heading">IPL Dashboard</h1>
        </div>

        <ul className="teams-list">
          {teamsList.map(eachTeam => (
            <TeamCard key={eachTeam.id} teamDetails={eachTeam} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state

    if (apiStatus === apiStatusConstants.success) {
      return <div className="home-container">{this.renderTeams()}</div>
    }

    if (apiStatus === apiStatusConstants.failure) {
      return (
        <div className="home-container">
          <p>Unable to load teams. Please try again.</p>
        </div>
      )
    }

    return <div className="home-container">{this.renderLoader()}</div>
  }
}

export default Home
