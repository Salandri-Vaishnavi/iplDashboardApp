import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {PieChart, Pie, Cell, Tooltip, Legend} from 'recharts'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const chartColors = ['#18ed66', '#e31a1a', '#f7b500']

class TeamMatches extends Component {
  state = {
    teamBannerUrl: '',
    latestMatchDetails: {},
    recentMatches: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {id} = match.params

    try {
      const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
      const data = await response.json()

      const latestMatchDetails = {
        umpires: data.latest_match_details.umpires,
        result: data.latest_match_details.result,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        id: data.latest_match_details.id,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
        matchStatus: data.latest_match_details.match_status,
      }

      const recentMatches = data.recent_matches.map(eachMatch => ({
        id: eachMatch.id,
        umpires: eachMatch.umpires,
        result: eachMatch.result,
        manOfTheMatch: eachMatch.man_of_the_match,
        date: eachMatch.date,
        venue: eachMatch.venue,
        competingTeam: eachMatch.competing_team,
        competingTeamLogo: eachMatch.competing_team_logo,
        firstInnings: eachMatch.first_innings,
        secondInnings: eachMatch.second_innings,
        matchStatus: eachMatch.match_status,
      }))

      this.setState({
        teamBannerUrl: data.team_banner_url,
        latestMatchDetails,
        recentMatches,
        apiStatus: apiStatusConstants.success,
      })
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  goToHome = () => {
    const {history} = this.props
    history.push('/')
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderMatchResultsChart = () => {
    const {latestMatchDetails, recentMatches} = this.state
    const allMatches = [latestMatchDetails, ...recentMatches]

    const wins = allMatches.filter(eachMatch => eachMatch.matchStatus === 'Won')
      .length

    const losses = allMatches.filter(
      eachMatch => eachMatch.matchStatus === 'Lost',
    ).length

    const draws = allMatches.filter(eachMatch =>
      ['Draw', 'Drawn', 'Tie', 'Tied'].includes(eachMatch.matchStatus),
    ).length

    const matchResults = [
      {name: 'Wins', value: wins},
      {name: 'Losses', value: losses},
      {name: 'Draws', value: draws},
    ]

    return (
      <div className="chart-container">
        <h2 className="chart-heading">Match Results</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={matchResults}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            outerRadius={90}
            label
          >
            {matchResults.map((entry, index) => (
              <Cell key={entry.name} fill={chartColors[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </div>
    )
  }

  renderTeamMatches = () => {
    const {teamBannerUrl, latestMatchDetails, recentMatches} = this.state

    return (
      <>
        <button type="button" className="back-button" onClick={this.goToHome}>
          Back
        </button>

        <img src={teamBannerUrl} alt="team banner" className="team-banner" />

        <LatestMatch latestMatchDetails={latestMatchDetails} />

        {this.renderMatchResultsChart()}

        <ul className="recent-matches-list">
          {recentMatches.map(eachMatch => (
            <MatchCard key={eachMatch.id} matchDetails={eachMatch} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state
    let content = this.renderLoader()

    if (apiStatus === apiStatusConstants.success) {
      content = this.renderTeamMatches()
    } else if (apiStatus === apiStatusConstants.failure) {
      content = (
        <p className="error-message">
          Unable to load team matches. Please try again.
        </p>
      )
    }

    return <div className="team-matches-container">{content}</div>
  }
}

export default TeamMatches
