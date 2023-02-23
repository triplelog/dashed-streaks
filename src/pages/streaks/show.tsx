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
    
    
    const cbChange = (event: any) => {
        if (event.target.checked){
            console.log('checked',event.target.name);
        }
        else {
            console.log('not',event.target.name);
        }
        let idx = parseInt(event.target.name);
        if (record && record.id && record.progress && record.morse){
            let id: string = record?.id;
            let pro: boolean[] = JSON.parse(record.progress);
            let mor: number[] = JSON.parse(record.morse);
            pro[idx]=event.target.checked;
            console.log(id);
            let phrase = fromMorseProgress(mor,pro);
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
                            message: `Good Job.`,
                            description: "!!!",
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
                        handleRefresh();
                    }
                }
            )
        }
        
        //createSchedule();
        
    }
    const getUpcoming = () => {
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
    }
    
    const createSchedule = () => {
        if (record && record.morse){
            const morseStr: any = record?.morse;
            const morse = JSON.parse(morseStr);
            let progress = [];
            if (record.progress){
                const progressStr: any = record?.progress;
                progress = JSON.parse(progressStr);
            }
            console.log(morse);
            let startDate = new Date(record?.start);

            let returnElements = [];
            
            if (record.type == "day"){
                let isNext = false;
                let isUpcoming = false;
                let idx = 0;
                for (var i=0;i<morse.length;i++){
                    let cboxes = [<Col flex="1rem"></Col>];
                    for (var j=0;j<morse[i];j++){
                        
                        let str = ""+idx;
                        cboxes.push(<Col flex="2rem"><Checkbox name={str} checked={progress[idx]} onChange={cbChange} ></Checkbox></Col>);
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
                    if (!isNext && startDate.getDate() >= new Date().getDate() && startDate.getMonth() >= new Date().getMonth() && startDate.getFullYear() >= new Date().getFullYear()){
                        returnElements.push(<Divider>Current</Divider>);
                        isNext = true;
                    }
                    else if (isNext && !isUpcoming && startDate.getDate() >= new Date().getDate() && startDate.getMonth() >= new Date().getMonth() && startDate.getFullYear() >= new Date().getFullYear()){
                        returnElements.push(<Divider>Upcoming</Divider>);
                        isUpcoming = true;
                    }
                    else if (i == 0){
                        returnElements.push(<Divider>Previous</Divider>);
                    }
                    
                    returnElements.push(<Row gutter={[8, 8]} className="showRow"><Col flex="16rem"><Text>{startDate.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</Text></Col>{cboxes}</Row>);
                    startDate.setDate(startDate.getDate() + 1);
                }
            }
            else if (record.type == "week"){
                let isNext = false;
                let isUpcoming = false;
                for (var i=0;i<morse.length;i++){
                    let cboxes = [<Col flex="1rem"></Col>];
                    for (var j=0;j<morse[i];j++){
                        cboxes.push(<Col flex="2rem"><Checkbox></Checkbox></Col>);
                    }
                    cboxes.push(<Col flex="auto"></Col>);
                    const sevenDate = new Date();
                    sevenDate.setDate(startDate.getDate() + 6);
                    if (!isNext && sevenDate.getDate() >= new Date().getDate() && sevenDate.getMonth() >= new Date().getMonth() && sevenDate.getFullYear() >= new Date().getFullYear()){
                        returnElements.push(<Divider>Current</Divider>);
                        isNext = true;
                    }
                    else if (isNext && !isUpcoming && sevenDate.getDate() >= new Date().getDate() && sevenDate.getMonth() >= new Date().getMonth() && sevenDate.getFullYear() >= new Date().getFullYear()){
                        returnElements.push(<Divider>Upcoming</Divider>);
                        isUpcoming = true;
                    }
                    else if (i == 0){
                        returnElements.push(<Divider>Previous</Divider>);
                    }
                    returnElements.push(<Row gutter={[8, 8]} className="showRow"><Col flex="16rem"><Text>{startDate.toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})}</Text></Col>{cboxes}</Row>);
                    startDate.setDate(startDate.getDate() + 7);
                }
            }
            else if (record.type == "month"){
                let isNext = false;
                let isUpcoming = false;
                for (var i=0;i<morse.length;i++){
                    let cboxes = [<Col flex="1rem"></Col>];
                    for (var j=0;j<morse[i];j++){
                        cboxes.push(<Col flex="2rem"><Checkbox></Checkbox></Col>);
                    }
                    cboxes.push(<Col flex="auto"></Col>);
                    if (!isNext && startDate.getMonth() >= new Date().getMonth() && startDate.getFullYear() >= new Date().getFullYear()){
                        returnElements.push(<Divider>Current</Divider>);
                        isNext = true;
                    }
                    else if (isNext && !isUpcoming && startDate.getMonth() >= new Date().getMonth() && startDate.getFullYear() >= new Date().getFullYear()){
                        returnElements.push(<Divider>Upcoming</Divider>);
                        isUpcoming = true;
                    }
                    else if (i == 0){
                        returnElements.push(<Divider>Previous</Divider>);
                    }
                    returnElements.push(<Row gutter={[8, 8]} className="showRow"><Col flex="16rem"><Text>{startDate.toLocaleDateString('en-us', { year:"numeric", month:"short"})}</Text></Col>{cboxes}</Row>);
                    startDate.setMonth(startDate.getMonth() + 1);
                }
            }
            return returnElements;
        }
        else {
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
