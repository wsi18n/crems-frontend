import React, { Component } from 'react';
import { Layout } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../../pages/home/home';
import { MyTicket, Related, Todo, AllTicket,
    CreateTicketIndex, CreateTicketDetail, TicketDetail } from '../../pages/ticket';
import DefaultHeader from './header';
import DefaultSider from './sider';
import DefaultFooter from './footer';
import RequireAuth from '../../components/auth/requireAuth';
import {
  ComputerRoomList, ComputerRoomDetail,
  CabinetList, CabinetDetail,
  CabinetUnitList,CabinetUnitDetail,
  MachineList, MachineDetail
} from '../../pages/computerRoom';
import { UserList, UserDetail, DepartmentList, DepartmentDetail } from '../../pages/user';

const Content = Layout;

class DefaultLayout extends Component {
    render() {
        return (
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                    <DefaultSider/>
                    <Layout>
                        <DefaultHeader/>
                        <Layout style={{ padding: '16px 24px 24px' }}>
                            <Content style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                                <Switch>
                                    <Route exact path="/home" name="home" component={RequireAuth(Home)} />
                                    <Route exact path="/CreateTicketIndex" name="CreateTicketIndex" component={RequireAuth(CreateTicketIndex)} />
                                    <Route exact path="/MyTicket" name="MyTicket" component={RequireAuth(MyTicket)} />
                                    <Route exact path="/Related" name="Related" component={RequireAuth(Related)} />
                                    <Route exact path="/Todo" name="Todo" component={RequireAuth(Todo)} />
                                    <Route exact path="/AllTicket" name="AllTicket" component={RequireAuth(AllTicket)} />
                                    <Route exact path="/CreateTicketDetail/:workflowID/:workflowName"
                                           name="CreateTicketDetail"
                                           component={RequireAuth(CreateTicketDetail)} />
                                    <Route exact path="/TicketDetail/:ticketID/"
                                           name="TicketDetail"
                                           component={RequireAuth(TicketDetail)} />

                                    <Route exact path="/ComputerRoomList/"
                                           name="ComputerRoomList"
                                           component={RequireAuth(ComputerRoomList)} />

                                    <Route exact path="/ComputerRoom/New/"
                                           name="ComputerRoomNew"
                                           component={RequireAuth(ComputerRoomDetail)} />
                                    <Route exact path="/ComputerRoom/:ComputerRoomID/"
                                           name="ComputerRoomDetail"
                                           component={RequireAuth(ComputerRoomDetail)} />


                                    <Route exact path="/CabinetList/"
                                           name="CabinetList"
                                           component={RequireAuth(CabinetList)} />

                                    <Route exact path="/Cabinet/New/"
                                           name="CabinetNew"
                                           component={RequireAuth(CabinetDetail)} />
                                    <Route exact path="/Cabinet/:CabinetID/"
                                           name="CabinetDetail"
                                           component={RequireAuth(CabinetDetail)} />


                                    <Route exact path="/CabinetUnitList/"
                                           name="CabinetUnitList"
                                           component={RequireAuth(CabinetUnitList)} />
                                    <Route exact path="/CabinetUnit/:CabinetUnitID/"
                                           name="CabinetUnitDetail"
                                           component={RequireAuth(CabinetUnitDetail)} />

                                    <Route exact path="/MachineList/"
                                           name="MachineList"
                                           component={RequireAuth(MachineList)}/>
                                    <Route exact path="/Machine/New/"
                                           name="MachineNew"
                                           component={RequireAuth(MachineDetail)}/>
                                    <Route exact path="/Machine/:MachineID/"
                                           name="MachineDetail"
                                           component={RequireAuth(MachineDetail)}/>


                                    <Route exact path="/UserList/"
                                           name="UserList"
                                           component={RequireAuth(UserList)} />
                                    <Route exact path="/User/New/"
                                           name="UserDetail"
                                           component={RequireAuth(UserDetail)} />
                                    <Route exact path="/User/:userID/"
                                           name="UserDetail"
                                           component={RequireAuth(UserDetail)} />


                                    <Route exact path="/DepartmentList/"
                                           name="DepartmentList"
                                           component={RequireAuth(DepartmentList)} />
                                    <Route exact path="/Department/New/"
                                           name="DepartmentNew"
                                           component={RequireAuth(DepartmentDetail)} />
                                    <Route exact path="/Department/:departmentID/"
                                           name="DepartmentDetail"
                                           component={RequireAuth(DepartmentDetail)} />

                                    <Redirect from="/" to="/CreateTicketIndex" />
                                </Switch>
                            </Content>
                        </Layout>
                        <DefaultFooter/>
                    </Layout>
                </Layout>
            </div>
        );
    };
}

export default DefaultLayout;

