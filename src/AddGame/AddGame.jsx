import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { scoreActions } from '../_actions';

class AddGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            player1: '',
            score1: '',
            player2: '',
            score2: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

         this.setState({ submitted: true });
         const { player1, score1, player2, score2 } = this.state;
         const user_id = this.props.user.user.id;
         if (player1 && score1 && player2 && score2 && user_id) {
             this.props.addScore(player1, Number(score1), player2, Number(score2), user_id);
             // this.setState({
             //     player1: '',
             //     score1: '',
             //     player2: '',
             //     score2: '',
             //     submitted: false
             // });
         }
    }


    render() {
        const { user } = this.props.user;
        const { player1, score1, player2, score2, submitted } = this.state;
        return (
            <div className="col-md-12 ">
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !player1 ? ' has-error' : '')}>
                        <label htmlFor="player1">player1</label>
                        <input type="text" className="form-control" name="player1" value={player1} onChange={this.handleChange} />
                        {submitted && !player1 &&
                        <div className="help-block">player1 is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !score1 ? ' has-error' : '')}>
                        <label htmlFor="score1">score1</label>
                        <input type="number" className="form-control" name="score1" value={score1} onChange={this.handleChange} />
                        {submitted && !score1 &&
                        <div className="help-block">score1 is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !player2 ? ' has-error' : '')}>
                        <label htmlFor="player2">player2</label>
                        <input type="text" className="form-control" name="player2" value={player2} onChange={this.handleChange} />
                        {submitted && !player2 &&
                        <div className="help-block">player2 is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !score2 ? ' has-error' : '')}>
                        <label htmlFor="score1">score2</label>
                        <input type="number" className="form-control" name="score2" value={score2} onChange={this.handleChange} />
                        {submitted && !score2 &&
                        <div className="help-block">score2 is required</div>
                        }
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary">Add game</button>
                    </div>
                </form>

            </div>
        );
    }
}

function mapState(state) {
   return {
       scores: state.scores,
       user:state.authentication
   }
}

const actionCreators = {
    addScore: scoreActions.add,
    deleteUser: scoreActions.delete
}

const connecteAddGame = connect(mapState, actionCreators)(AddGame);
export { connecteAddGame as AddGame };