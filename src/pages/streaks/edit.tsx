import React, { useState } from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";

import {
    Alert,
    Button,
    Edit,
    Form,
    Input,
    ListButton,
    RcFile,
    RefreshButton,
    DatePicker,
    Checkbox,
    Radio,
    Select,
    Upload,
    useForm,
    useSelect,
} from "@pankod/refine-antd";

import MDEditor from "@uiw/react-md-editor";
import dayjs from 'dayjs';
import { IStreak } from "interfaces";
import { supabaseClient } from "utility";
import { createMorse, fromMorse } from "utility/morse";

export const StreakEdit: React.FC<IResourceComponentsProps> = () => {
    

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
    const [ld0,setLD0] = useState(false);
    const [ld1,setLD1] = useState(false);
    const [ld2,setLD2] = useState(false);
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
            start: `${start.toISOString()}`,
            
        });
    };
    const onoffToArray = (onoff2: string) => {
        if (onoff2 && onoff2.length >6){
            let arr = [];
            let arr2 = [];
            for (var i=0;i<7;i++){
                if (onoff2[i] =="1"){
                    arr.push(""+i);
                    arr2.push(true);
                }
                else {
                    arr2.push(false);
                }
            }
            if (!ld2){
                setSchedule(arr2);
                setLD2(true);
            }
            return arr;
        }
        return ['0','1','2','3','4','5','6'];
    }
    const dateFromStart = (start2: string) => {
        if (start2){
            var newDate = new Date(start2);
            let dj = dayjs(start2);
            
            if (!ld1){
                setStart(newDate);
                setLD1(true);
            }
            //setStart(newDate);
            return dj;
        }
        return undefined;
    }
    const typeToType = (type2: string) => {
        if (type2){
            if (!ld0){
                setType(type2);
                setLD0(true);
            }
            return type2;
        }
        return "day";
    }
    

    return (
        <Edit
            saveButtonProps={saveButtonProps}
            headerProps={{
                extra: (
                    <>
                        <ListButton />
                    </>
                ),
            }}
        >
            
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
                        defaultValue={typeToType(formProps.initialValues?.type)}
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
                    <Checkbox.Group options={scheduleOptions} defaultValue={onoffToArray(formProps.initialValues?.onoff)} />
                    
                    
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
                    <DatePicker defaultValue={dateFromStart(formProps.initialValues?.start)} onChange={(event) => {changeDate(event)}} />
                </Form.Item>
                
                
            </Form>
        </Edit>
    );
};
