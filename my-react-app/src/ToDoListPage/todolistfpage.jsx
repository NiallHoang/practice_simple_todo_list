import React from "react";
import {Row, Col} from 'antd';
import TodoList from "./todoComponents/TodoLists";
import SideBar from "./Sidebar/SideBar";
function ToDoListPage() {
    return(
        <Row style={{ minHeight: "100vh" }}>
            <Col span={4}><SideBar /></Col>
            <Col span={20}><TodoList /></Col>
        </Row>
    )
};
export default ToDoListPage;