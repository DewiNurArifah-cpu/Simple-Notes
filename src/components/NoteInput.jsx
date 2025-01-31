import React from 'react';
 
class NoteInput extends React.Component {
    constructor(props) {
        super(props);
      
        // inisialisasi state
        this.state = {
          id: +new Date(),
          title: '',
          body: '',
          createdAt: new Date().toISOString(),
          archived: false,
          charLimit:50
        }
      
        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
      }
      
      onTitleChangeEventHandler(event) {
        const title = event.target.value;
        const maxCharLimit = 50;
        if(title.length <= maxCharLimit) {
          const remainingChar = maxCharLimit - title.length;
          this.setState(() => {
            return {
              title: event.target.value,
              charLimit: remainingChar >=0 ? remainingChar : 0
            };
          });
        }
      }
      
      onBodyChangeEventHandler(event) {
        this.setState(() => {
          return {
            body: event.target.value,
          }
        });
      }
      
      onSubmitEventHandler(event) {
        event.preventDefault();
        this.props.onAddNote(this.state);

        this.setState(() => {
          return {
            title: '',
            body: ''
          }
        })
      }
 render() {
    return (
      <div className='note-input'>
        <h2 className='.note-input__title'>Buat Catatan</h2>
        <p className='note-input__title__char-limit' placeholder="Sisa karakter" onKeyDown={this.onTitleChangeEventHandler}>Sisa karakter : {this.state.charLimit}</p>
        <div className='note-input__body'>
          <form onSubmit={this.onSubmitEventHandler}>
            <input type="text" placeholder="Ini adalah judul ..." value={this.state.title} onChange={this.onTitleChangeEventHandler} />
            <textarea type="text" placeholder="Tuliskan catatanmu di sini ..." value={this.state.body} onChange={this.onBodyChangeEventHandler} />
            <button disabled={this.state.title=== '' || this.state.body === ''}>Buat</button>
          </form>
        </div>
      </div>
      
    )
  }
}
 
export default NoteInput;