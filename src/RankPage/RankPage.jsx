import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AddGame } from '../AddGame';
import { scoreActions } from '../_actions';

class RankPage extends React.Component {
    componentDidMount() {
        this.props.getScoresRank();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, scores } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.username}!</h1>
                <p>
                    <Link to="/">Home</Link>
                </p>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
                <h3>Ranks:</h3>
                {scores.loading && <em>Loading ...</em>}
                {scores.error && <span className="text-danger">ERROR: {scores.error}</span>}
                {scores.ranks && scores.ranks.length > 0 &&
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">PLAYER NAME</th>
                        <th scope="col">Points</th>
                        <th scope="col">WINS</th>
                    </tr>
                    </thead>
                    <tbody>
                    {scores.ranks.map((score, index) =>
                        <tr key={index}>
                        <th scope="row">{index}</th>
                        <td > {score.player_name}</td>
                        <td > {score.score} </td>
                        <td > {score.wins} </td>
                        </tr>

                    )}
                    </tbody>
                </table>
                }

            </div>
        );
    }
}

function mapState(state) {
    const { scores, authentication } = state;
    const { user } = authentication;
    return { user, scores };
}

const actionCreators = {
    getScoresRank: scoreActions.getAllRank,
}

const connectedRankPage = connect(mapState, actionCreators)(RankPage);
export { connectedRankPage as RankPage };