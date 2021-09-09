import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import {Button} from 'react-bootstrap'
import axios from "axios"
import filiereController from '../../services/Controllers/filiereController'
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import Controls from "../../components/controls/Controls";
import AddIcon from '@material-ui/icons/Add';
import AddFiliere from './AddFiliere'

import UpdateFiliere from './UpdateFiliere'


class TableFiliere extends Component {

      handleClick(evt){
        evt.preventDefault()
        console.log('errr');
        window.location.reload() 
    }

    constructor(){
        super()
        this.state={
            Filieres:[]
        }
        this.filiereController = new filiereController()
    }
    componentDidMount(){
        this.getAllFiliere()

    }
    getAllFiliere(){
        axios.get('http://localhost:3000/filiere/findfiliere').then(response=>{
            console.log('response',response.data.data);
           
           this. setState({Filieres:response.data.data})
            
        })
    }

    update(id){
        localStorage.setItem('idFiliere',id)
    }
    delete(id){
       this.filiereController.delete(id).then(response=>{
        console.log('response from delete filiere',response);
       })
    }
    

    state = {
        show: false,
        showUpdate:false,
        showdelete:false


      };
      showModal = e => {
        this.setState({
          show: true
        });

      };
      showModalUpdate = e => {
        this.setState({
          showUpdate: true
        });
        
      };
      showModaldelete = e => {
        this.setState({
          showdelete: true
        });
      };
    render(){

    return (
      
      
        <div>
        <div> 
        <PageHeader
            title="Filiere"
            subTitle="gestion des Filieres"
            icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
        />
        <Controls.Button1
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            style={{left:'930px',
            bottom:'110px',
            color:'black',
            border: '1px solid black'}}
            variant="primary" onClick={e => {this.showModal(e);}}
        />
        
      <AddFiliere
        show={this.state.show}
        onClose={() => this.showModal()}
      />
      <UpdateFiliere
              show={this.state.showUpdate}
              onClose={() => this.showModalUpdate()}
      />
      <deleteFiliere
      
        show={this.state.showdelete}
        onClose={() => this.showModaldelete()}
      />
        </div>
        <div>
        <div>
                            <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">Action</th>
                                <th scope="col">Nom de Filiere</th>
                                <th scope="col">Niveau</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                            
                            this.state.Filieres?.map((item)=>{
                                                  
                                return(
                                    <tr>
                                        <td>
                                          <i class=' fa fa-edit fa-lg mt-8 ' style={{color:"green"}}  onClick={(evt)=>{this.update(item._id) ; this.showModalUpdate(evt)} }>
                                          </i>
                                          <i class=' fa fa-trash fa-lg mt-8 ' style={{color:"black"}} onClick={()=>this.delete(item._id)}>
                                          </i>
                                        </td>
                                        <td>{item.nom_filiere}</td>
                                        <td>{item.niveau}</td>
                                    </tr>
                                )
                                
                            })
                            }
                          
                            </tbody>
                            </table>
                        </div>

    </div>
    </div>
    );
}
}

export default TableFiliere;