import React, { Component } from 'react';
import { Task } from './Task'
import { Droppable, Draggable } from 'react-beautiful-dnd';
//Material ui
import { Tooltip, Zoom } from '@material-ui/core';
import { RiDeleteBin2Line } from 'react-icons/ri'

import ContentEditable from 'react-contenteditable';
import { BiMessageAltAdd } from 'react-icons/bi';


export class Group extends Component {

    state = {
        id: ''
    }

    componentDidMount() {
        this.contentEditable = React.createRef();
        this.setState({ ...this.props.group })
    }

    handleChange = (ev) => {
        this.setState({ name: ev.target.value });
    }

    render() {
        if (!this.state.id) return <h1>Loading...</h1>
        const elGroupName = this.state.name
        return (
            <Draggable draggableId={this.props.group.id} index={this.props.index}>
                {(provided, snapshot) =>
                    <section key={this.props.group.id} className="group padding-y-30"
                        {...provided.draggableProps}

                        ref={provided.innerRef}>
                        <div className="group-header-container flex space-between align-center" {...provided.dragHandleProps}>
                            <div className="group-header-left flex">
                                <Tooltip enterDelay={200} TransitionComponent={Zoom} title="Delete Group" arrow>
                                    <div className='icon-container'>
                                        <RiDeleteBin2Line onClick={() => {
                                            this.props.onRemoveGroup(this.props.group.id)
                                        }} />

                                    </div>
                                </Tooltip>
                                <h1 className="group-title">
                                    <ContentEditable
                                        className="cursor-initial"
                                        innerRef={this.contentEditable}
                                        html={elGroupName} // innerHTML of the editable div
                                        disabled={false}       // use true to disable editing
                                        onChange={this.handleChange} // handle innerHTML change
                                        onBlur={() => {
                                            this.props.onEditGroup(this.state, this.state.name, elGroupName)
                                        }}
                                        onKeyDown={(ev) => {
                                            if (ev.key === 'Enter') {
                                                ev.target.blur()
                                                this.props.onEditTask(this.state)
                                            }
                                        }}
                                    />
                                </h1>
                            </div>
                            <div className="group-header-right flex">

                                <h3>Members</h3>
                                <h3>Status</h3>
                                <h3>Due-Date</h3>
                                <h3>Priority</h3>
                                <h3>Images</h3>


                            </div>
                        </div>

                        <Droppable droppableId={this.props.group.id} type="task">
                            {(provided, snapshot) =>
                                <div className={`task-list ${snapshot.isDraggingOver ? 'drag-over' : ''}`}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {this.props.group.tasks.map((task, index) => {
                                        return <Task onEditTask={this.props.onEditTask} index={index} onRemoveTask={this.props.onRemoveTask} key={task.id}
                                            task={task} users={this.props.users} />
                                    })}
                                    {provided.placeholder}

                                </div>
                            }
                        </Droppable>

                        <Tooltip enterDelay={200} TransitionComponent={Zoom} title="Add New Task" arrow>
                            <div className='icon-container rotate180'>
                                <BiMessageAltAdd onClick={() => {
                                    this.props.onAddTask(this.props.group.id)
                                }} />
                            </div>
                        </Tooltip>

                    </section>
                }
            </Draggable>
        )
    }

} 