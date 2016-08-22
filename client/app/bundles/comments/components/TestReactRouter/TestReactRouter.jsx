import React, { PropTypes } from 'react';
import css from './TestReactRouter.scss';
import BaseComponent from 'libs/components/BaseComponent';
var Griddle = require('griddle-react');
import { connect } from 'react-redux';

function stateToProps(state) {
    // Which part of the Redux global state does our component want to receive as props?
    if (state.$$expensesStore) {
        debugger;
        return {
            expensesCount: state.$$expensesStore.get('$$expenses').size,
            pathname: state.railsContext.pathname,
        };
    } else {
        return { };
    }
}


export default class TestReactRouter extends BaseComponent {


    static propTypes = {
        expensesCount: PropTypes.number.isRequired,
        pathname: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            amount: "",
            expense_type: "",
            expense_receipt: "",
            description: ""
        };


        // Bind callback methods to make `this` the correct context.
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleExpenseTypeChange = this.handleExpenseTypeChange.bind(this);
        this.readURL = this.readURL.bind(this);
    }


    handleTitleChange (e) {;
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


    handleSubmit(e) {
        e.preventDefault();

        var fileInput = document.getElementById('attachment');
        var file = fileInput.files[0];
        var formData = new FormData();

        var title = this.refs.title.getDOMNode().value.trim();
        var content = this.refs.content.getDOMNode().value.trim();
        var attachment = this.refs.attachment.getDOMNode().value.trim();

        this.refs.title.getDOMNode().value = "";
        this.refs.content.getDOMNode().value = "";
        this.refs.attachment.getDOMNode().value = "";

        formData.append("attachment", this.state.expense_receipt);
        formData.append("title", state.state.title);
        formData.append("description", this.state.description);

        $.ajax({
            url: "/api/v1/expenses",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            dataType: 'json',
            success: function(data) {
                //this.props.onNewPost(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.log("error creating expense", xhr, status, err);
            }.bind(this)
        });
    }

  render() {
    return (
      <div className={'container ' + css.expense}>
          <h2>New Expense</h2>
          <form className={css.newexpense} onSubmit={this.handleSubmit} encType="multipart/form-data">
              <label htmlFor="title">Title</label>
              <input type="text" className={'form-control ' + css.expenselabel} onChange={this.handleTitleChange}  ref="title" id="title" name="title" placeholder="title" />

              <label htmlFor="expense_type">Expense Type</label>
              <input type="text" className={'form-control ' + css.expenselabel} onChange={this.handleExpenseTypeChange}  ref="expense_type" id="expense_type" name="expense_type" placeholder="expense_type" />


              <label htmlFor="amount">Amount</label>
              <input type="text" className={'form-control ' + css.expenselabel} onChange={this.handleAmountChange}  ref="amount" id="amount" name="amount" placeholder="amount" />


              <label htmlFor="description">Expense Description</label>
              <textarea className="form-control" rows="4" name="description" onChange={this.handleDescriptionChange} ref="description" id="description" placeholder="description"></textarea>

              <img id="attachment_img" src="#" alt="your image" style={{display: 'none'}} />
              <label htmlFor="attachment">Upload Receipt</label>

              <label className="btn btn-default btn-file">
                  Browse <input onChange={this.readURL} type="file" ref="attachment" id="attachment" name="attachment" style={{display: 'none'}}/>
              </label>
              <button className={'btn primary ' + css.subbtn} type="submit" >Submit</button>
          </form>

          <div id="existing_expenses">

              <Griddle results={[]}/>


          </div>
      </div>
    );
  }

}

// Don't forget to actually use connect!
export default connect(stateToProps)(TestReactRouter);
