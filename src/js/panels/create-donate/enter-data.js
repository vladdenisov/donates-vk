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
    Input,
    Textarea,
    Select,
} from "@vkontakte/vkui";

class CreateDonateData extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.data)
        this.onFormChange = this.onFormChange.bind(this)
        this.state = {
            activeTab: props.activeTab["EXAMPLE"] || "modal"
        };
    }

    // setTab(tab) {
    //     this.setState({
    //         activeTab: tab
    //     });
    // }

    // componentWillUnmount() {
    //     const { setScrollPositionByID, setActiveTab } = this.props;

    //     setActiveTab("EXAMPLE", this.state.activeTab);
    //     setScrollPositionByID("EXAMPLE_TABS_LIST");
    // }

    componentDidMount() {
        if (this.props.data.img) {
            document.getElementsByClassName('image-select')[0].style.backgroundImage = `url(${this.props.data.img})`
            document.getElementsByClassName('image-select-span')[0].style.display = 'none'
            document.getElementsByClassName('image-select-delete')[0].setAttribute('style', 'display: block !important')
        }
    }
    onFormChange(type, data) {
        this.props.data[type] = data
        this.props.setState('', this.props.data)
        console.log(this.props.data)
    }
    render() {
        const { id, setPage } = this.props;

        return (
            <Panel id={id}>
                <PanelHeader left={<PanelHeaderBack onClick={this.props.onBackClick} />} >{this.props.data.type === 0 ? "Целевой" : "Регулярный"} сбор</PanelHeader>
                <Group>
                    <Div>
                        <input type='file' style={{ display: 'none' }} onChange={(e) => {
                            if (!e.target.files[0]) return
                            let src = URL.createObjectURL(e.target.files[0])
                            document.getElementsByClassName('image-select')[0].style.backgroundImage = `url(${src})`
                            this.onFormChange('img', src)
                            document.getElementsByClassName('image-select')[0].style.border = `none`
                            document.getElementsByClassName('image-select-span')[0].style.display = 'none'
                            document.getElementsByClassName('image-select-delete')[0].setAttribute('style', 'display: block !important')
                        }} className='image-upload' />
                        <div className='image-select' onClick={() => {
                            if (this.props.data.img) return
                            if (this.props.data.img === '') {
                                this.props.data.img = null
                                return
                            }
                            document.getElementsByClassName('image-upload')[0].click()
                        }}>
                            <span className="image-select-delete"><Icon24DismissOverlay onClick={() => {
                                document.getElementsByClassName('image-select-span')[0].style.display = 'flex'
                                document.getElementsByClassName('image-select')[0].style.backgroundImage = `none`
                                document.getElementsByClassName('image-select')[0].style.border = `1px dashed #3F8AE0`

                                document.getElementsByClassName('image-select-delete')[0].setAttribute('style', 'display: none !important')
                                this.onFormChange('img', '')
                            }} /></span>
                            <span className="image-select-span"><Icon28PictureOutline /><span> Загрузить обложку</span></span>
                        </div>
                    </Div>
                    <FormLayout>
                        <FormLayoutGroup top="Название сбора">
                            <Input type="text" placeholder="Название сбора" onChange={(e) => this.onFormChange('name', e.target.value)} defaultValue={this.props.data['name']} />
                        </FormLayoutGroup>
                        <FormLayoutGroup top="Сумма, Р">
                            <Input type="number" placeholder="Сколько нужно собрать?" onChange={(e) => this.onFormChange('money', e.target.value)} defaultValue={this.props.data['money']} />
                        </FormLayoutGroup>
                        <FormLayoutGroup top="Цель">
                            <Input type="text" placeholder={this.props.data.type === 0 ? "Например, лечение человека" : "Например, поддержка приюта"} onChange={(e) => this.onFormChange('target', e.target.value)} defaultValue={this.props.data['target']} />
                        </FormLayoutGroup>
                        <FormLayoutGroup top="Описание">
                            <Textarea placeholder="На что пойдут деньги и как они кому-то помогут?" onChange={(e) => this.onFormChange('description', e.target.value)} defaultValue={this.props.data['description']} />
                        </FormLayoutGroup>
                        <FormLayoutGroup top="Куда получать деньги?">
                            <Select onChange={(e) => this.onFormChange('debt', e.target.value)} defaultValue={this.props.data['debt']}>
                                <option value="1234" defaultValue>Счет VKPay 1234</option>
                                <option value="2334">Счет VKPay 2334</option>
                            </Select>
                        </FormLayoutGroup>
                        {this.props.data.type === 1 ? <FormLayoutGroup top="Автор">
                            <Select onChange={(e) => this.onFormChange('author', e.target.value)} defaultValue={this.props.data['author']}>
                                <option className="select-default" value="Арсений Граур" defaultValue>Арсений Граур</option>
                                <option value="VK Tech">VK Tech</option>
                            </Select>
                        </FormLayoutGroup> : null
                        }
                    </FormLayout>
                    <Div><Button size="xl" stretched onClick={() => {
                        if (this.props.data.type === 0) {
                            setPage('create-donate', 'more')
                        }
                        else {
                            if (!this.props.data.author) this.onFormChange('author', document.getElementsByClassName('select-default')[0].value)
                            setPage('snippet', 'base')
                        }
                    }}>{this.props.data.type === 0 ? "Далее" : "Создать сбор"}</Button></Div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateDonateData);
