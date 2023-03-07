import React from 'react';
export default function AddButton(props) {
  return (
    <> 
<button type="button" className="btn btn-primary btn-sm fw-bold" data-bs-toggle="modal" data-bs-target="#exampleModal">
  ADD TASK
</button>

<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
  <form onSubmit={props.submitHandler}>
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Task # {props.taskNo}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
       
      <div className="form-outline mb-4">
    <input type="text"  className="form-control" name='title'/>
    <label className="form-label" >Title</label>
  </div>
  <div className="form-outline mb-4">
   <textarea className="form-control" name='description' rows="3"></textarea>
    <label className="form-label" >Description</label>
  </div>
  
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary" >Add</button>
      </div>
     
    </div>
    </form>
  </div>
</div></>
    
  )
}
