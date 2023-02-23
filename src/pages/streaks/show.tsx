import { useShow, IResourceComponentsProps, useUpdate } from "@pankod/refine-core";

import {
    Show,
    AntdList,
    Col,
    Divider,
    Row,
    Typography,
    MarkdownField,
    Space,
    ImageField,
    Alert,
    Button,
    Checkbox,
    ListButton,
    EditButton,
    RefreshButton,
} from "@pankod/refine-antd";

import { IStreak } from "interfaces";
import { useState } from "react";

import { createMorse, fromMorse, fromMorseProgress } from "utility/morse";

const { Title, Text } = Typography;

export const StreakShow: React.FC<IResourceComponentsProps> = () => {
    const [isDeprecated, setIsDeprecated] = useState(false);
    let pp: any = {};
    const [progressChanges, setProgressChanges] = useState(pp);
    let maxmorse = -1;

    const { queryResult } = useShow<IStreak>({
        liveMode: "manual",
        onLiveEvent: () => {
            setIsDeprecated(true);
        }
    });

    const { mutate } = useUpdate();

    const { data, isLoading } = queryResult;
    const record = data?.data;
    const [yesterday,setYesterday] = useState(record?.word);
    const [yesterdayTasks,setYesterdayTasks] = useState(0);
    let chgTimeout: any = false;
    const uploadChanges = () => {
        if (record && record.id && record.progress && record.morse && record.word){
            let id: string = record?.id;
            let mor: number[] = JSON.parse(record.morse);
            let pro = JSON.parse(record.progress);
            console.log(progressChanges);
            for (var i in progressChanges){
                pro[i] = progressChanges[i];
            }
            console.log(maxmorse);
            let phrase = fromMorseProgress(mor,pro,maxmorse,record.word);
            console.log(phrase);
            mutate({
                    resource: "streaks",
                    values: {
                        progress: JSON.stringify(pro),
                        progressphrase: phrase
                    },
                    id: id,
                    successNotification: (data, values, resource) => {
                        return {
                            message: `Progress saved.`,
                            description: "Your progress has been saved.",
                            type: "success",
                        };
                    },
                },
                {
                    onError: (error, variables, context) => {
                        // An error occurred!
                    },
                    onSuccess: (data, variables, context) => {
                        // Let's celebrate!
                        //handleRefresh();
                        console.log(Date.now());
                    }
                }
            )
        }
    }
    const cbChange = (event: any) => {
        console.log(Date.now());
        if (event.target.checked){
            console.log('checked');
        }
        else {
            console.log('not');
        }
        let idx = parseInt(event.target.name);
        setProgressChanges((state: any) => {state[idx]=event.target.checked; return state;})
        if (chgTimeout){clearTimeout(chgTimeout);}
        chgTimeout = setTimeout(uploadChanges,2000);
        
        //createSchedule();
        return true;
    }
    const getUpcoming = () => {
        console.log(Date.now());
        console.log(record);
        const startDate = new Date(record?.start).getTime();
        const endDate = new Date().getTime();
        console.log(startDate);
        const timeSinceStart = endDate - startDate;
        console.log(timeSinceStart);
        const daysSinceStart = Math.floor(timeSinceStart/24/3600/1000);
        console.log(daysSinceStart);
        setYesterday(record?.word);
        const morseStr: string = record?.morse as string;
        console.log(JSON.parse(morseStr));
        const tasks: any = JSON.parse(morseStr)[daysSinceStart];
        console.log(tasks);
        setYesterdayTasks(tasks);
        console.log(Date.now());
    }
    
    const createSchedule = () => {
        console.log(Date.now());
        //setIsDeprecated(false);
        if (record && record.morse){
            const morseStr: any = record?.morse;
            const morse = JSON.parse(morseStr);
            let progress = [];
            if (record.progress){
                const progressStr: any = record?.progress;
                progress = JSON.parse(progressStr);
            }
            console.log(morse);
            console.log(progress);
            let startDate = new Date(record?.start);

            let returnElements = [<Row gutter={[0, 8]}><Text>Progress: {record.progressphrase}</Text></Row>,
                <Row gutter={[0, 8]}><Text>Goal Phrase: {record.word}</Text></Row>,
                <Row gutter={[0, 8]}><Text>Dot Task: {record.dot}</Text></Row>,
                <Row gutter={[0, 8]}><Text>Dash Task: {record.dash}</Text></Row>,
                <Row gutter={[0, 8]}><Text>Description: {record.name}</Text></Row>];
            let previousElements = [];
            let upcomingElements = [];
            
            if (record.type == "day"){
                let isNext = false;
                let isUpcoming = false;
                let idx = 0;
                for (var i=0;i<morse.length;i++){
                    let cboxes = [<Col flex="1rem"></Col>];
                    for (var j=0;j<morse[i];j++){
                        
                        let str = ""+idx;
                        cboxes.push(<Col flex="2rem"><Checkbox name={str} defaultChecked={progress[idx]} onChange={cbChange} ></Checkbox></Col>);
                        idx++;
                    }
                    cboxes.push(<Col flex="auto"></Col>);
                    let onoff = record.onoff.at(startDate.getDay());
                    let count = 0;
                    while(onoff == "0" && count < 14){
                        startDate.setDate(startDate.getDate() + 1);
                        onoff = record.onoff.at(startDate.getDay());
                        count++;
                    }
                    const sevenDate = new Date(startDate);
                    const tDate = new Date();
                    if (!isNext && (sevenDate > tDate || ( sevenDate.getDate() >= tDate.getDate() && sevenDate.getMonth() >= tDate.getMonth() && sevenDate.getFullYear() >= tDate.getFullYear()))){
                   
                        returnElements.push(<Divider>Current</Divider>);
                        isNext = true;
                        maxmorse = i+1;
                    }
                    else if (isNext && !isUpcoming && (sevenDate > tDate || ( sevenDate.getDate() >= tDate.getDate() && sevenDate.getMonth() >= tDate.getMonth() && sevenDate.getFullYear() >= tDate.getFullYear()))){
                        
                        isUpcoming = true;
                    }
                    
                    if (!isNext && !isUpcoming){
                        previousElements.push(<Row gutter={[8, 8]} className="showRow"><Col flex="16rem"><Text>{startDate.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</Text></Col>{cboxes}</Row>);
                    }
                    else if (isUpcoming){
                        upcomingElements.push(<Row gutter={[8, 8]} className="showRow"><Col flex="16rem"><Text>{startDate.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</Text></Col>{cboxes}</Row>);
                    }
                    else {
                        returnElements.push(<Row gutter={[8, 8]} className="showRow"><Col flex="16rem"><Text>{startDate.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</Text></Col>{cboxes}</Row>);
                    }
                    startDate.setDate(startDate.getDate() + 1);
                }
            }
            else if (record.type == "week"){
                let isNext = false;
                let isUpcoming = false;
                let idx = 0;
                for (var i=0;i<morse.length;i++){
                    let cboxes = [<Col flex="1rem"></Col>];
                    for (var j=0;j<morse[i];j++){
                        
                        let str = ""+idx;
                        cboxes.push(<Col flex="2rem"><Checkbox name={str} defaultChecked={progress[idx]} onChange={cbChange} ></Checkbox></Col>);
                        idx++;
                    }
                    cboxes.push(<Col flex="auto"></Col>);
                    const sevenDate = new Date(startDate);
                    sevenDate.setDate(sevenDate.getDate() + 6);
                    const tDate = new Date();
                    if (!isNext && (sevenDate > tDate || ( sevenDate.getDate() >= tDate.getDate() && sevenDate.getMonth() >= tDate.getMonth() && sevenDate.getFullYear() >= tDate.getFullYear()))){
                        returnElements.push(<Divider>Current</Divider>);
                        isNext = true;
                        maxmorse = i+1;
                    }
                    else if (isNext && !isUpcoming && (sevenDate > tDate || ( sevenDate.getDate() >= tDate.getDate() && sevenDate.getMonth() >= tDate.getMonth() && sevenDate.getFullYear() >= tDate.getFullYear()))){
                        //returnElements.push(<Divider>Upcoming</Divider>);
                        isUpcoming = true;
                    }
                    
                    let endDate = new Date(startDate);
                    endDate.setDate(startDate.getDate() + 6);
                    if (!isNext && !isUpcoming){
                        previousElements.push(<Row gutter={[8, 8]} className="showRow"><Col flex="16rem"><Text>{startDate.toLocaleDateString('en-us', { month:"short", day:"numeric"})} - {endDate.toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})}</Text></Col>{cboxes}</Row>);
                    }
                    else if (isUpcoming){
                        upcomingElements.push(<Row gutter={[8, 8]} className="showRow"><Col flex="16rem"><Text>{startDate.toLocaleDateString('en-us', { month:"short", day:"numeric"})} - {endDate.toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})}</Text></Col>{cboxes}</Row>);
                    }
                    else {
                        returnElements.push(<Row gutter={[8, 8]} className="showRow"><Col flex="16rem"><Text>{startDate.toLocaleDateString('en-us', { month:"short", day:"numeric"})} - {endDate.toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})}</Text></Col>{cboxes}</Row>);
                    }
                    startDate.setDate(startDate.getDate() + 7);
                }
            }
            else if (record.type == "month"){
                let isNext = false;
                let isUpcoming = false;
                let idx = 0;
                for (var i=0;i<morse.length;i++){
                    let cboxes = [<Col flex="1rem"></Col>];
                    for (var j=0;j<morse[i];j++){
                        
                        let str = ""+idx;
                        cboxes.push(<Col flex="2rem"><Checkbox name={str} defaultChecked={progress[idx]} onChange={cbChange} ></Checkbox></Col>);
                        idx++;
                    }
                    cboxes.push(<Col flex="auto"></Col>);
                    if (!isNext && startDate.getMonth() >= new Date().getMonth() && startDate.getFullYear() >= new Date().getFullYear()){
                        returnElements.push(<Divider>Current</Divider>);
                        isNext = true;
                        maxmorse = i;
                    }
                    else if (isNext && !isUpcoming && startDate.getMonth() >= new Date().getMonth() && startDate.getFullYear() >= new Date().getFullYear()){
                        //returnElements.push(<Divider>Upcoming</Divider>);
                        isUpcoming = true;
                    }
                    else if (i == 0){
                        //returnElements.push(<Divider>Previous</Divider>);
                    }

                    if (!isNext && !isUpcoming){
                        previousElements.push(<Row gutter={[8, 8]} className="showRow"><Col flex="16rem"><Text>{startDate.toLocaleDateString('en-us', { year:"numeric", month:"short"})}</Text></Col>{cboxes}</Row>);
                    }
                    else if (isUpcoming){
                        upcomingElements.push(<Row gutter={[8, 8]} className="showRow"><Col flex="16rem"><Text>{startDate.toLocaleDateString('en-us', { year:"numeric", month:"short"})}</Text></Col>{cboxes}</Row>);
                    }
                    else {
                        returnElements.push(<Row gutter={[8, 8]} className="showRow"><Col flex="16rem"><Text>{startDate.toLocaleDateString('en-us', { year:"numeric", month:"short"})}</Text></Col>{cboxes}</Row>);
                    }
                    startDate.setMonth(startDate.getMonth() + 1);
                }
            }
            console.log(Date.now());
            if (upcomingElements.length > 0){
                returnElements.push(<Divider>Upcoming</Divider>);
                returnElements.push(<Row className="showRowHolder">{upcomingElements}</Row>);
            }
            if (previousElements.length > 0){
                returnElements.push(<Divider>Previous</Divider>);
                previousElements.reverse();
                returnElements.push(<Row className="showRowHolder">{previousElements}</Row>);
            }
            return returnElements;
        }
        else {
            console.log(Date.now());
            return <Row></Row>;
        }
    }
    const handleRefresh = () => {
        queryResult.refetch();
        getUpcoming();
        setIsDeprecated(false);
    };

    return (
        <Show
            isLoading={isLoading}
            headerProps={{
                extra: (
                    <>
                        <ListButton />
                        <EditButton />
                        <RefreshButton onClick={handleRefresh} />
                    </>
                ),
            }}
        >
            {isDeprecated && (
                <Alert
                    message="This streak has changed. Reload to see it's latest version."
                    type="warning"
                    style={{
                        marginBottom: 20,
                    }}
                    action={
                        <Button
                            onClick={handleRefresh}
                            size="small"
                            type="ghost"
                        >
                            Refresh
                        </Button>
                    }
                />
            )}

            
            <>{createSchedule()}</>

        </Show>
    );
};
