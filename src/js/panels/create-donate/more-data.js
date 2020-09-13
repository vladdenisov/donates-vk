import React from 'react';
import { connect } from 'react-redux';

import { setPage } from "../../store/router/actions";
import { setActiveTab, setScrollPositionByID } from "../../store/vk/actions";
import { restoreScrollPosition } from "../../services/_functions";
import { Icon28PictureOutline, Icon24DismissOverlay } from '@vkontakte/icons'
import {
    Div,
    Panel,
    Group,
    Button,
    PanelHeader,
    PanelHeaderBack,
    FormLayout,
    FormLayoutGroup,
    Radio,
    Input,
    Select,
} from "@vkontakte/vkui";

class CreateDonateMoreData extends React.Component {

    constructor(props) {
        super(props);
        this.onFormChange = this.onFormChange.bind(this)
    }
    componentDidMount() {
        if (!this.props.data.mode) this.onFormChange('mode', 1)
    }
    onFormChange(type, data) {
        this.props.data[type] = data
        this.props.setState('', this.props.data)
        console.log(this.props.data.mode)
    }
    render() {
        const { id, setPage } = this.props;

        return (
            <Panel id={id}>
                <PanelHeader left={<PanelHeaderBack onClick={this.props.onBackClick} />} >{this.props.data.type === 0 ? "Целевой" : "Регулярный"} сбор</PanelHeader>
                <Group>
                    <FormLayout>
                        <FormLayoutGroup top="Автор">
                            <Select onChange={(e) => this.onFormChange('author', e.target.value)} defaultValue={this.props.data['author']}>
                                <option className="select-default" value="Арсений Граур" defaultValue>Арсений Граур</option>
                                <option value="VK Tech">VK Tech</option>
                            </Select>
                        </FormLayoutGroup>
                        <FormLayoutGroup top="Сбор завершится">
                            <Radio name="radio" value="1" onChange={() => {
                                document.getElementsByClassName('Input__el')[0].disabled = true
                                this.onFormChange('mode', 1)
                            }} defaultChecked>Когда соберем сумму</Radio>
                            <Radio name="radio" value="2" onChange={() => {
                                document.getElementsByClassName('Input__el')[0].disabled = false
                                this.onFormChange('mode', 2)
                            }}>В определенную дату</Radio>
                        </FormLayoutGroup>
                        <FormLayoutGroup top="Дата окончания">
                            <Input type='date' className='date-input' onChange={(e) => this.onFormChange('date', e.target.value)} disabled />
                        </FormLayoutGroup>

                    </FormLayout>
                    <Div><Button size="xl" stretched onClick={() => {
                        if (!this.props.data.author) this.onFormChange('author', document.getElementsByClassName('select-default')[0].value)
                        setPage('snippet', 'base')
                    }}>Создать сбор</Button></Div>
                </Group>
            </Panel>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        activeTab: state.vkui.activeTab,
    };
};

const mapDispatchToProps = {
    setPage,
    setActiveTab,
    setScrollPositionByID
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDonateMoreData);
