import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

//components
import { fetchPosts } from '../redux/actions/index';

class PostIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
      return this.props.posts.map((post) => {
        return (
          <li className="list-group-item" key={ post.id }>
            <Link to={ "posts/" + post.id } >
                <span className="pull-xs-right">{post.categories}</span>
                <strong>{post.title}</strong>
            </Link>
          </li>
        );
      })
  }

  render() {
    return(
      <div>
          <div className="text-xs-right">
            <Link to="/posts/new" className="btn btn-primary" >
              Dodajte Post
            </Link>
          </div>
          <h3>Posts</h3>
          <ul className="list-group">
            { this.renderPosts() }
          </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts.all };
}

export default connect(mapStateToProps, { fetchPosts: fetchPosts })(PostIndex);

/*
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts }, dispatch);
}

export default connect(null, mapDispatchToProps)(PostIndex);
*/
