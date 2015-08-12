var React = require( "react" );
var DateUtil = require( "./util/date" );
var moment = require( "moment" );

var DateInput = React.createClass( {

  getDefaultProps: function() {
    return {
      dateFormat: "YYYY-MM-DD",
      className: "datepicker__input",
      onBlur: function() {}
    };
  },

  getInitialState: function() {
    return {
      value: this.safeDateFormat( this.props.date )
    };
  },

  componentDidMount: function() {
    this.toggleFocus( this.props.focus );
  },

  componentWillReceiveProps: function( newProps ) {
    this.toggleFocus( newProps.focus );

    this.setState( {
      value: this.safeDateFormat( newProps.date )
    } );
  },

  toggleFocus: function( focus ) {
    if ( focus ) {
      React.findDOMNode( this.refs.input ).focus();
    } else {
      React.findDOMNode( this.refs.input ).blur();
    }
  },

  handleChange: function( event ) {
    var newValue = event.target.value != "" ? event.target.value : null;
    if(newValue == this.state.value) return; // Prevent infinite loop in IE10

    var date = moment( newValue, this.props.dateFormat, true );

    if ( date.isValid() ) {      
      this.props.setSelected( new DateUtil( date ) );
    } else if ( newValue == null ) {      
      this.props.clearSelected();
    } else{      
      this.setState( {
        value: newValue
      } );
    }
  },

  safeDateFormat: function( date ) {
    return !!date ? date.format( this.props.dateFormat ) : null;
  },

  handleKeyDown: function( event ) {
    switch ( event.key ) {
    case "Enter":
      event.preventDefault();
      this.props.handleEnter();
      break;
    case "Escape":
      event.preventDefault();
      this.props.hideCalendar();
      break;
    }
  },

  handleClick: function( event ) {
    if ( !this.props.disabled ) {
      this.props.handleClick( event );
    }
  },

  render: function() {
    return <input
        ref="input"
        type="text"
        name={this.props.name}
        value={this.state.value}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        onChange={this.handleChange}
        className={this.props.className}
        disabled={this.props.disabled}
        placeholder={this.props.placeholderText} />;
  }
} );

module.exports = DateInput;
