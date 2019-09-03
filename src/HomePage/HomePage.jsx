import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AddGame } from '../AddGame';
import { scoreActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getScores();
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
                    <Link to="/rank">Ranks</Link>
                </p>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
                <AddGame/>
                <h3>Games:</h3>
                {scores.loading && <em>Loading ...</em>}
                {scores.error && <span className="text-danger">ERROR: {scores.error}</span>}
                {scores.items && scores.items.length > 0 &&
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Player1</th>
                        <th scope="col">Player2</th>
                    </tr>
                    </thead>
                    <tbody>
                    {scores.items.map((score, index) =>
                        <tr key={index}>
                        <th scope="row">{index}</th>
                        <td className={(score.score1 > score.score2 ? 'win_block' : 'loose_block')} > {score.player1} : {score.score1}</td>
                        <td className={(score.score1 < score.score2 ? 'win_block' : 'loose_block')}> {score.player2} : {score.score2}</td>
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
    getScores: scoreActions.getAll,

}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };