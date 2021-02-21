import React from 'react';
import { connect } from 'react-redux';

import { Drawer, Button, Form, Select, TimePicker, Switch } from 'antd';

import './index.scss';

const { Option } = Select;

const FilterDrawer = (props) => {
  const {onClose, visible, onFinish} = props;

  const drawerFooter = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <Button onClick={onClose}>
        Cancel
      </Button>
      <Button form="filter" onClick={onClose} type="primary" htmlType="submit">
        Apply Filter(s)
      </Button>
    </div>
  )

  return (
    <Drawer
      title="Filters"
      width="20rem"
      onClose={onClose}
      visible={visible}
      footer={drawerFooter}
    >
      <Form id="filter" layout="vertical" onFinish={onFinish}>
        <Form.Item name="dow" label="Day of Week">
          <Select placeholder="select a day of the week" >
            <Option value={0}>Monday</Option>
            <Option value={1}>Tuesday</Option>
            <Option value={2}>Wednesday</Option>
            <Option value={3}>Thursday</Option>
            <Option value={4}>Friday</Option>
            <Option value={5}>Saturday</Option>
            <Option value={6}>Sunday</Option>
          </Select>
        </Form.Item>
        <Form.Item name="time" label="Time">
          <TimePicker use12Hours={true} minuteStep={15} format="h:mm" bordered={false} />
        </Form.Item>
        <div style={{display: "flex", gap: "1rem"}}>
          <Form.Item name="walkThru" label="Walk-Thru" valuePropName="checked" initialValue={true}>
            <Switch defaultChecked />
          </Form.Item>
          <Form.Item name="driveThru" label="Drive-Thru" valuePropName="checked" initialValue={true}>
            <Switch defaultChecked />
          </Form.Item>
        </div>
      </Form>
    </Drawer>
  );
}

const mapStateToProps = (state) => ({
  sites: state.sites.sites,
  filtered: state.sites.filtered,
});

export default connect(mapStateToProps)(FilterDrawer);
