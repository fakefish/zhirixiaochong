
var ZhiChong = React.createClass({
	getInitialState: function() {
		return  {
			data: []
		};
	},

	componentDidMount: function() {
		this._fetchFromServer();
		setInterval(this._fetchFromServer, this.props.pollInterval);
	},

	_fetchFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			success: function(data) {
				this.setState({
					data: data.query.results.stories
				});
			}.bind(this)
		})
		
	},

	render: function() {
		return (
			<ZhiChongList data={this.state.data}/>
		);
	}

});
var ZhiChongList = React.createClass({
	render: function() {
		var topicNodes = this.props.data.map(function(topic) {
			return (
				<ZhiChongItem 
					topic={ topic }/>
			)
		})
		return (
			<div class="zhichong-list">
				{ topicNodes }
			</div>
		);
	}
});
var ZhiChongItem = React.createClass({
	render: function() {
		var topic = this.props.topic;
		return (
			<h3><a href={ "http://daily.zhihu.com/story/" + topic.id } target="_blank">{ topic.title }</a></h3>
		)
	}
})

React.render(
	<ZhiChong 
		url="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fnews-at.zhihu.com%2Fapi%2F4%2Fnews%2Flatest%22%20and%20itemPath%20%3D%20%22json.stories%22&format=json&callback="
        pollInterval={30000}/>,
	document.body
)