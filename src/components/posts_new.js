import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../redux/actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(props) {
    this.props.createPost(props)
        .then(() => {
            //blog post je napravljen, navigiraj usera natrag na pocetak
            this.context.router.push('/');
        });
  }

  render() {
    const { fields: { title, categories, content }, handleSubmit } = this.props;

    return(
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
            <h3>Napravite novi Post</h3>

            <div className={ `form-group ${title.touched && title.invalid ? 'has-danger' : '' }` } >
                <label>Naslov:</label>
                <input type="text" className="form-control" { ...title } />
                <div className="text-help">
                  { title.touched ? title.error : '' }
                </div>
            </div>

            <div className={ `form-group ${categories.touched && categories.invalid ? 'has-danger' : '' }` } >
                <label>Kategorije:</label>
                <input type="text" className="form-control" { ...categories }/>
                <div className="text-help">
                  { categories.touched ? categories.error : '' }
                </div>
            </div>

            <div className={ `form-group ${content.touched && content.invalid ? 'has-danger' : '' }` } >
                <label>Sadržaj:</label>
                <textarea className="form-control" { ...content }/>
                <div className="text-help">
                  { content.touched ? content.error : '' }
                </div>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to="/" className="btn btn-danger">Cancel</Link>

        </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.title) {
    errors.title = 'Unsite naslov Posta';
  }

  if(!values.categories) {
    errors.categories = 'Unesite kategorije Posta';
  }

  if(!values.content) {
    errors.content = 'Unesite sadržaj Posta';
  }
  return errors;
}

export default reduxForm({
    form: 'PostsNewForm',
    fields: ['title', 'categories', 'content'],
    validate
}, null, { createPost } )(PostsNew);
