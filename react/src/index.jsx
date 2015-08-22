var React = require('react');
var Router = require('react-router');
var Highlight = require('react-highlight');
var Highcharts = require('react-highcharts');
var Jquery = require('jquery');
var mui = require('material-ui');
var injectTapEventPlugin = require("react-tap-event-plugin");

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var ThemeManager = new mui.Styles.ThemeManager();
var List = mui.List;
var ListItem = mui.ListItem;
var ListDivider = mui.ListDivider;

window.React = React;
injectTapEventPlugin();

var App = React.createClass({
  render: function () {
    return (
      <div className="col">
        <Topics />
        <RouteHandler/>
      </div>
    );
  }
});

function getTopicListItem (topic, id) {
  var linkId = "/topic/" + (parseInt(id, 10) + 1) ;
  return (
    <List key={id}>
      <Link to={linkId}>{topic.url}</Link>
    </List>
  );
}

var Topics = React.createClass({
  contextTypes: {
    name: React.PropTypes.string
  },

  getInitialState: function () {
    return {
      topics: []
    };
  },

  getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentWillMount: function () {
    var self = this;

    Jquery.ajax({
      url: 'http://localhost:8000/api/get-topics',
      dataType: 'json',
      cache: false,
      success: function (data) {
        self.setState({topics: data.data});
      },
      error: function (xhr, status, err) {
        console.error('http://localhost:8000/api/get-topics', status, err.toString());
      }
    });
  },

  render: function () {
    var links = this.state.topics.map(getTopicListItem);
    return (
      <div>
        <h1>HackerNews</h1>
        <h2>List of Topics</h2>
        <ListItem>
            { links }
        </ListItem>
      </div>
    );
  }
});

var Topic = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  createConfig: function () {
    var topicId = this.getStateFromStore().id;
    console.log(topicId);
    return Jquery.get('http://localhost:8000/api/get-topics/' + topicId);
  },

  setConfig: function (res) {
    return {
      chart: {
        type: 'column'
      },
      title: {
         text: '10 most frequent words in:'
      },
      subtitle: {
        useHTML: true,
        text: '<a href="' + res.data.url + '" target="_blank">' + res.data.url + '</a>',
        style: {
          color: '#555555',
          fontWeight: 'bold',
          textDecoration: 'none',
        }
      },
      xAxis: {
        categories: [],
        type: 'category'
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Word count in current topic'
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y}'
          }
        }
      },
      tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span> appear: <b>{point.y}</b><br/>'
      },
      series: [{
        name: 'Words',
        colorByPoint: true,
        data: []
      }]
    };
  },

  getStateFromStore: function () {
    return {
      id: this.context.router.getCurrentParams().topicId,
      config: {}
    };
  },

  getInitialState: function () {
    console.log('getInitialState');
    return this.getStateFromStore();
  },

  componentWillReceiveProps: function () {
    console.log('componentWillReceiveProps');
    console.log(this.state.id);
    this.createConfig().success((res) => {
      var words, config, word;

      words = res.data.words;
      config = this.setConfig(res);

      for (word in words) {
        config.xAxis.categories.push(word);
        config.series[0].data.push({
          name: word,
          y: words[word]
        });
      }

      this.setState({
        id: this.state.id,
        config: config
      });
    });
  },

  componentDidMount: function () {
    console.log('componentDidMount');
    this.createConfig().success((res) => {
      var words, config, word;

      words = res.data.words;
      config = this.setConfig(res);

      for (word in words) {
        config.xAxis.categories.push(word);
        config.series[0].data.push({
          name: word,
          y: words[word]
        });
      }

      this.setState({
        id: this.state.id,
        config: config
      });
    });
  },

  render: function () {
    return (
      <div>
        <Highcharts config={this.state.config}></Highcharts>
      </div>
    );
  }
});

var NotFound = React.createClass({
  render: function () {
    return (<h2>Not found</h2>);
  }
});

var Index = React.createClass({
  render: function () {
    return (<h1>Address Book</h1>);
  }
});

var routes = (
  <Route handler={App}>
    <Route path="topic/:topicId" handler={Topic}/>
    <Route path="*" component={NotFound} />
    <DefaultRoute handler={Index}/>
  </Route>
);

Router.run(routes, function (Handler, state) {
  var params = state.params;
  React.render(<Handler params={params}/>, document.body);
});
