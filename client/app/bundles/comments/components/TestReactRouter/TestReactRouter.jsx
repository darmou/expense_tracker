import React, { PropTypes } from 'react';
import css from './TestReactRouter.scss';
import BaseComponent from 'libs/components/BaseComponent';
var Griddle = require('griddle-react');
import Immutable from 'immutable';
import request from 'axios';
import { bindActionCreators } from 'redux';
import * as commentsActionCreators from '../../actions/commentsActionCreators';
import Functions from '../../utils/functions';
import { connect } from 'react-redux';
import Cookie from "js-cookie";
import moment from "moment";
var DOM = React.DOM;
import Lightbox from 'react-lightbox';
import NumberInput from 'react-number-input';


function stateToProps(state) {

    // Which part of the Redux global state does our component want to receive as props?
    if (state.$$expensesStore) {
        return {
            expenses: state.$$expensesStore.get('$$expenses'),
            pathname: state.railsContext.pathname,
        };
    } else {
        return { };
    }
}


export default class DateComponent extends BaseComponent {
    static propTypes = {
        rowData: PropTypes.object.isRequired,
        data: PropTypes.string.isRequired
    };

    render() {

        return <span>{moment(this.props.data).format("MM/DD/YYYY")}</span>;
    }
}

export default class Controls extends BaseComponent {
    static propTypes = {
        backward: PropTypes.func.isRequired,
        forward: PropTypes.func.isRequired
    };

    render() {
        return DOM.div({
                className: 'my-controls'
            },
            DOM.div({
                className: 'my-button my-button-left',
                onClick: this.props.backward
            }, '<'),
            DOM.div({
                className: 'my-button my-button-right',
                onClick: this.props.forward
            }, '>')
        );
    }
}

export default class ReceiptComponent extends BaseComponent {
    static propTypes = {
        rowData: PropTypes.object.isRequired,
        data: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            currentImage: 0,
            lightboxIsOpen: false
        };

        this.closeLightbox = this.closeLightbox.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
    }

    closeLightbox () {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }


    gotoPrevious () {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }
    gotoNext () {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }

        render() {
        if(this.props.data) {

            return <Lightbox
                pictures={[
                    this.props.data
                ]}
                keyboard
                controls={null}
            />;
        } else {
            return <span></span>; //no data
        }

    }
}


export default class TestReactRouter extends BaseComponent {


    static propTypes = {
        expenses: PropTypes.object.isRequired,
        pathname: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };


    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    componentDidMount() {
        $.ajax({
            method: "GET",
            url: "/auth/is_signed_in.json"
        })
            .done(function(data){
                //our route debugger

                if(!data.signed_in) {
                    if(!(typeof(this.context) === "undefined")) {
                        this.context.router.push('/');
                    }
                } else {
                    const actions = bindActionCreators(commentsActionCreators, this.props.dispatch);
                    actions.fetchExpenses(this.props.params.id);
                 }
            }.bind(this));
    }

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            amount: null,
            expenseList: [],
            expense_type: "",
            expense_receipt: "",
            description: "",
            currentImage: 0,
            lightboxIsOpen: false
        };

        // Bind callback methods to make `this` the correct context.
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleExpenseTypeChange = this.handleExpenseTypeChange.bind(this);
        this.signOut = this.signOut.bind(this);
        this.readURL = this.readURL.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
    }

    closeLightbox () {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }


    gotoPrevious () {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }
    gotoNext () {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }

    handleTitleChange (e) {
        this.setState({title: e.target.value.trim()});
    }


    handleDescriptionChange (e)  {
        this.setState({description: e.target.value});
    }

    handleExpenseTypeChange (e)  {
        this.setState({expense_type: e.target.value});
    }

    handleAmountChange (e)  {
        this.setState({amount: e.target.value});
    }

    readURL(input) {
        if (input.target.files && input.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#attachment_img').show();
                //We can now attatch our
                this.setState({expense_receipt: e.target.result});

                $('#attachment_img')
                    .attr('src', e.target.result)
                    .width(150)
                    .height(200);
            }.bind(this); //we can set the state

            reader.readAsDataURL(input.target.files[0]);
        }
    }

    signOut(){
        Cookie.remove( "_expense_tracker_session");
        $.ajax({
            method: "DELETE",
            url: "/users/sign_out.json",
            data: {
                authenticity_token: $('meta[name=csrf-token]').attr("content")
            }
        }).done(function(){
            //location.reload();
            Cookie.remove( "_expense_tracker_session");
            Cookie.remove( "_expense_tracker_session", {domain: 'localhost:5000'});
            const actions = bindActionCreators(commentsActionCreators, this.props.dispatch);
            actions.clearExpenses();

            //location.reload();
            this.context.router.push('/');
        }.bind(this));


    }

    handleSubmit(e) {
        e.preventDefault();

        // var fileInput = document.getElementById('attachment');
        // var file = fileInput.files[0];
        // var formData = new FormData();
        //
        // var title = this.state.title.trim();
        // var expense_type = this.state.expense_type.trim();
        // var amount = this.state.amount.trim();
        //
        // var content = this.refs.content.getDOMNode().value.trim();
        // var attachment = this.refs.attachment.getDOMNode().value.trim();

        debugger;
        // this.refs.title.getDOMNode().value = "";
        // this.refs.description.getDOMNode().value = "";
        // this.refs.attachment.getDOMNode().value = "";
        // this.refs.expense_type.getDOMNode().value = "";
        // this.refs.amount.getDOMNode().value = "";
        var formData = {};
        formData["expense"] = {};

        formData["expense"]["expense_receipt"] = this.state.expense_receipt;
        formData["expense"]["title"] = this.state.title;
        formData["expense"]["expense_type"] = this.state.expense_type;
        formData["expense"]["amount"] = this.state.amount;
        formData["expense"]["description"] = this.state.description;
        formData["expense"]["user_id"] = this.props.params.id;

        $.post("/api/v1/expenses", formData, function(response) {

            if(response.success) {
                //refetch our expeneses
                const actions = bindActionCreators(commentsActionCreators, this.props.dispatch);
                actions.fetchExpenses(this.props.params.id);
            }
            // Do something with the request
        }.bind(this), 'json');

    }

  render() {
      var columnMeta = [
          {
              "columnName": "id",
              "order": 1,
              "locked": false,
              "visible": true
          },
          {
              "columnName": "title",
              "displayName": "Title",
              "order": 2,
              "locked": false,
              "visible": true
          },
          {
              "columnName": "expense_type",
              "displayName": "Expense Type",
              "order": 3,
              "locked": false,
              "visible": true
          },
          {
              "columnName": "amount",
              "displayName": "Amount",
              "order": 4,
              "locked": false,
              "visible": true
          },
          {
              "columnName": "receipt_url",
              "displayName": "Receipt Img",
              "order": 5,
              "locked": false,
              "visible": true,
              "customComponent": ReceiptComponent
          },
          {
              "columnName": "description",
              "displayName": "Description",
              "order": 6,
              "locked": false,
              "visible": true
          },
          {
              "columnName": "created_at",
              "displayName": "Created",
              "order": 7,
              "locked": false,
              "visible": true,
              "customComponent": DateComponent
          },
          {
              "columnName": "updated_at",
              "displayName": "Updated",
              "order": 8,
              "locked": false,
              "visible": true,
              "customComponent": DateComponent
          },

      ];




    return (
      <div className='container'>




          <a href="#" onClick={this.signOut}>Sign out</a>
          <div className={css.expense}>
              <h2>New Expense</h2>
              <form className={css.newexpense} onSubmit={this.handleSubmit} encType="multipart/form-data">
                  <label htmlFor="title">Title</label>
                  <input type="text" className={'form-control ' + css.expenselabel} onChange={this.handleTitleChange}  ref="title" id="title" name="title" placeholder="Title" />

                  <label htmlFor="expense_type">Expense Type</label>
                  <input type="text" className={'form-control ' + css.expenselabel} onChange={this.handleExpenseTypeChange}  ref="expense_type" id="expense_type" name="expense_type" placeholder="Expense Type" />


                  <label htmlFor="amount">Amount</label>

                  <NumberInput
                      id="amount"
                      name="amount"
                      className={'form-control ' + css.expenselabel}
                      type="number"                   // optional, input[type]. Defaults to "tel" to allow non numeric characters
                      onChange={this.handleAmountChange}   // use it like normal event handler
                      value={this.state.amount}        // normal react input binding
                      placeholder="Enter amount"       // all other input properties are supported
                  />




                  <label htmlFor="description">Expense Description</label>
                  <textarea className="form-control" rows="4" name="description" onChange={this.handleDescriptionChange} ref="description" id="description" placeholder="Description"></textarea>

                  <img id="attachment_img" src="#" alt="your image" style={{display: 'none'}} />
                  <label htmlFor="attachment">Upload Receipt</label>

                  <label className="btn btn-default btn-file">
                      Browse <input onChange={this.readURL} type="file" ref="attachment" id="attachment" name="attachment" style={{display: 'none'}}/>
                  </label>
                  <button className={'btn primary ' + css.subbtn} type="submit" >Submit</button>
              </form>
          </div>

          <div id="existing_expenses" className={css.griddle_exp_list}>

              <Griddle columnMetadata={columnMeta} columns={["id","title","expense_type","amount","receipt_url","description","created_at","updated_at"]} results={this.props.expenses.toJSON()}/>


          </div>

      </div>
    );
  }

}

// Don't forget to actually use connect!
export default connect(stateToProps)(TestReactRouter);
