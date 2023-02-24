import { useState, useEffect } from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";

import {
    Create,
    Form,
    Input,
    Select,
    Radio,
    Checkbox,
    DatePicker,
    TimePicker,
    Upload,
    useForm,
    useSelect,
    RcFile,
} from "@pankod/refine-antd";



import MDEditor from "@uiw/react-md-editor";

import { supabaseClient } from "utility";
import { createMorse, fromMorse } from "utility/morse";

export const StreakCreate: React.FC<IResourceComponentsProps> = (  ) => {
    const { formProps, saveButtonProps, onFinish } = useForm();
    const [schedule, setSchedule] = useState([true,true,true,true,true,true,true]);
    const onCBChg = (event: any) => {
        schedule[parseInt(event.target.value)]=event.target.checked;
        setSchedule(schedule);
    }
    const dailyOptions = [
        { label: 'Sunday', value: '0', checked:schedule[0], onChange:onCBChg},
        { label: 'Monday', value: '1', checked:schedule[1], onChange:onCBChg },
        { label: 'Tuesday', value: '2', checked:schedule[2], onChange:onCBChg },
        { label: 'Wednesday', value: '3', checked:schedule[3], onChange:onCBChg },
        { label: 'Thursday', value: '4', checked:schedule[4], onChange:onCBChg },
        { label: 'Friday', value: '5', checked:schedule[5], onChange:onCBChg },
        { label: 'Saturday', value: '6', checked:schedule[6], onChange:onCBChg },
    ];
    
    const [timeType, setType] = useState("day");
    const [start, setStart] = useState(new Date());
    const [scheduleOptions, setSO] = useState(dailyOptions);
    const changeType = (value: string) => {
        if (value == "day"){
            setSO(dailyOptions);
        }
        setType(value);
        //setValues({start: value});
    }
    const changeDate = (value: any) => {
        var newDate = new Date(value);
        setStart(newDate);
    };

    const handleOnFinish = (values: any) => {
        const morse: number[] = createMorse(values.word);
        let progress = [];
        for (var i=0,len=morse.length;i<len;i++){
            if (morse[i]==2){progress.push(false)}
            if (morse[i]>=1){progress.push(false)}
        }
        let onoff = "1";
        if (timeType == "day"){
            onoff = "";
            for (var i=0;i<7;i++){
                if (schedule[i]){onoff += "1";}
                else {onoff += "0";}
            }
        }
        onFinish({
            morse: morse,
            name: `${values.name}`,
            word: `${values.word}`,
            type: `${timeType}`,
            onoff: onoff,
            dot: `${values.dot}`,
            dash: `${values.dash}`,
            progress: progress,
            progressphrase: "",
            start: `${start.toISOString()}`,
            
        });
    };

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} onFinish={(values) => handleOnFinish(values)} layout="vertical">
                
                <Form.Item
                    label="Description"
                    name="name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Word/Phrase"
                    name="word"
                    rules={[
                        {required: true,},
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Frequency"
                >
                    <Radio.Group 
                        name="type"
                        optionType="button"
                        buttonStyle="solid"
                        defaultValue="day"
                        onChange={(event) => {changeType(event.target.value)}}
                    >
                        <Radio value="day" >Day</Radio>
                        <Radio value="week" >Week</Radio>
                        <Radio value="month" >Month</Radio>
                    </Radio.Group>
                </Form.Item>
                { timeType == "day" && (
                <Form.Item
                    label="Schedule"
                >
                    <Checkbox.Group options={scheduleOptions} defaultValue={['0','1','2','3','4','5','6','7','8']} />
                    
                    
                </Form.Item>
                )}
                <Form.Item
                    label="Dot Task"
                    name="dot"
                    rules={[
                        {required: true,},
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Dash Task"
                    name="dash"
                    rules={[
                        {required: true,},
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Start Date"
                >
                    <DatePicker onChange={(event) => {changeDate(event)}} />
                </Form.Item>
                
                
            </Form>
        </Create>
    );
};
