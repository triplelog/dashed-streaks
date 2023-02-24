import { useShow, IResourceComponentsProps, useUpdate } from "@pankod/refine-core";

import {
    Show,
    AntdList,
    Col,
    Divider,
    Row,
    Tabs,
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
import routerProvider from "@pankod/refine-react-router-v6";

const { Link } = routerProvider;
import { IStreak } from "interfaces";
import { useState } from "react";

import { createMorse, fromMorse, fromMorseProgress } from "utility/morse";

const { Title, Text } = Typography;

const items: any = [
    {
      key: '1',
      label: `Diet`,
      children: [<ImageField
            value="./diet.png"
            alt="Diet Image"
            width="100%"
        />,<Text>Lose weight month-by-month a pound or two at a time. </Text>],
    },
    {
      key: '2',
      label: `Video`,
      children: [<ImageField
            value="./video.png"
            alt="Video Image"
            width="100%"
        />,<Text>Create something like videos or blog posts most weeks. </Text>],
    },
    {
      key: '3',
      label: `Write`,
      children: [<ImageField
            value="./writing.png"
            alt="Writing Image"
            width="100%"
        />,<Text>Put some words on a page on a regular basis. </Text>],
    },
];
  
export const About: React.FC = () => {
    


    return (
        <div style={{ display:"grid", gap:"1rem" }}>
            <Row style={{ width:"100%" }}>
                <Col span={24} md={7} className="aboutTop" >
                    <Title style={{ textAlign:"center" }}>What?</Title>
                    <ul>
                        <li>Set a goal phrase.</li>
                        <li>Convert it to morse code.</li>
                        <li>Follow the pattern!</li>
                    </ul>
                </Col>
                <Col span={24} md={{span: 7, offset:1}} className="aboutTop" >
                    <Title style={{ textAlign:"center" }}>Why?</Title>
                    <ul>
                        <li>Consistency without monotony.</li>
                        <li>Regular accountability.</li>
                        <li>Flexible goals for every purpose.</li>
                    </ul>
                </Col>
                <Col span={24} md={{span: 7, offset:1}} className="aboutTop" >
                    <Title style={{ textAlign:"center" }}>When?</Title>
                    <ul>
                        <li>Daily (choose days of the week).</li>
                        <li>Weekly for bigger tasks.</li>
                        <li>Monthly for long term goals.</li>
                    </ul>
                </Col>
            </Row>
            <Row style={{ width:"100%" }}>
                <Col span={24} md={{span: 12, offset:0}} style={{padding:"0.25rem"}} >
                    <Row style={{ width:"100%" }}>
                        <Col span={24}>
                            <Title>How?</Title>
                            <div>
                                To create a streak, you will need to set some options on the <Link to="../streaks/create">create page</Link>.
                                <ul>
                                <li>The description is just for you to know what your goal is.</li>
                                <li>The phrase is what will be converted to morse code to generate the pattern. Pick the phrase that will motivate you the most. Longer phrases will generate longer streaks!</li>
                                <li>You can create daily, weekly, or monthly streaks.</li>
                                <li>If you create a daily streak, you can uncheck some checkboxes to create off days on certain days each week.</li>
                                <li>Set the challenges to complete for dots and dashes. Make the tasks easy or hard, it is up to you.</li>
                                <li>Set the start date. For monthly tasks, pick any date in desired month.
                                For weekly tasks, each week will start on the selected day of the week.</li>
                                </ul>

                            </div>
                            <div>
                            To track your progress, click the eyeball from the <Link to="../streaks">list of streaks</Link> and then check the appropriate checkboxes as you complete tasks.
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Title>Morse Code</Title>
                            <div>
                                <p>Each phrase will be converted to morse code with a dot requiring one task and a dash requiring a second task.
                                After each letter is completed, a day off is added for a pause.
                                After a word is completed, two days off are added to represent a space.</p>
                                <p>If you do not complete the tasks required, then the generated phrase will have a dot instead of a dash or a pause instead of a dot/dash and at least one character will not be correct.
                                The following characters are acceptable:
                                </p>
                                <Row style={{ width:"100%" }}>
                                    <Col span={24} md={11} style={{ padding:"0.25rem" }}>
                                        <h3 style={{textAlign:"center"}}>Letters</h3>
                                        <table className="morseTable" style={{ border:"1px solid black" }}>
                                            <tr><td>A</td><td>.</td><td>-</td><td></td><td></td><td></td></tr>
                                            <tr><td>B</td><td>-</td><td>.</td><td>.</td><td>.</td><td></td></tr>
                                            <tr><td>C</td><td>-</td><td>.</td><td>-</td><td>.</td><td></td></tr>
                                            <tr><td>D</td><td>-</td><td>.</td><td>.</td><td></td><td></td></tr>
                                            <tr><td>E</td><td>.</td><td></td><td></td><td></td><td></td></tr>
                                            <tr><td>F</td><td>.</td><td>.</td><td>-</td><td>.</td><td></td></tr>
                                            <tr><td>G</td><td>-</td><td>-</td><td>.</td><td></td><td></td></tr>
                                            <tr><td>H</td><td>.</td><td>.</td><td>.</td><td>.</td><td></td></tr>
                                            <tr><td>I</td><td>.</td><td>.</td><td></td><td></td><td></td></tr>
                                            <tr><td>J</td><td>.</td><td>-</td><td>-</td><td>-</td><td></td></tr>
                                            <tr><td>K</td><td>-</td><td>.</td><td>-</td><td></td><td></td></tr>
                                            <tr><td>L</td><td>.</td><td>-</td><td>.</td><td>.</td><td></td></tr>
                                            <tr><td>M</td><td>-</td><td>-</td><td></td><td></td><td></td></tr>
                                            <tr><td>N</td><td>-</td><td>.</td><td></td><td></td><td></td></tr>
                                            <tr><td>O</td><td>-</td><td>-</td><td>-</td><td></td><td></td></tr>
                                            <tr><td>P</td><td>.</td><td>-</td><td>-</td><td>.</td><td></td></tr>
                                            <tr><td>Q</td><td>-</td><td>-</td><td>.</td><td>-</td><td></td></tr>
                                            <tr><td>R</td><td>.</td><td>-</td><td>.</td><td></td><td></td></tr>
                                            <tr><td>S</td><td>.</td><td>.</td><td>.</td><td></td><td></td></tr>
                                            <tr><td>T</td><td>-</td><td></td><td></td><td></td><td></td></tr>
                                            <tr><td>U</td><td>.</td><td>.</td><td>-</td><td></td><td></td></tr>
                                            <tr><td>V</td><td>.</td><td>.</td><td>.</td><td>-</td><td></td></tr>
                                            <tr><td>W</td><td>.</td><td>-</td><td>-</td><td></td><td></td></tr>
                                            <tr><td>X</td><td>-</td><td>.</td><td>.</td><td>-</td><td></td></tr>
                                            <tr><td>Y</td><td>-</td><td>.</td><td>-</td><td>-</td><td></td></tr>
                                            <tr><td>Z</td><td>-</td><td>-</td><td>.</td><td>.</td><td></td></tr>
                                        </table>
                                    </Col>
                                    <Col span={24} md={{span: 11, offset:2}} style={{ padding:"0.25rem" }} >
                                        <h3 style={{textAlign:"center"}}>Digits/Punc.</h3>
                                        <table className="morseTable" style={{ border:"1px solid black" }}>
                                            <tr><td>0</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr>
                                            <tr><td>1</td><td>.</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr>
                                            <tr><td>2</td><td>.</td><td>.</td><td>-</td><td>-</td><td>-</td><td></td></tr>
                                            <tr><td>3</td><td>.</td><td>.</td><td>.</td><td>-</td><td>-</td><td></td></tr>
                                            <tr><td>4</td><td>.</td><td>.</td><td>.</td><td>.</td><td>-</td><td></td></tr>
                                            <tr><td>5</td><td>.</td><td>.</td><td>.</td><td>.</td><td>.</td><td></td></tr>
                                            <tr><td>6</td><td>-</td><td>.</td><td>.</td><td>.</td><td>.</td><td></td></tr>
                                            <tr><td>7</td><td>-</td><td>-</td><td>.</td><td>.</td><td>.</td><td></td></tr>
                                            <tr><td>8</td><td>-</td><td>-</td><td>-</td><td>.</td><td>.</td><td></td></tr>
                                            <tr><td>9</td><td>-</td><td>-</td><td>-</td><td>-</td><td>.</td><td></td></tr>
                                            <tr><td>.</td><td>.</td><td>-</td><td>.</td><td>-</td><td>.</td><td>-</td></tr>
                                            <tr><td>,</td><td>-</td><td>-</td><td>.</td><td>.</td><td>-</td><td>-</td></tr>
                                            <tr><td>?</td><td>.</td><td>.</td><td>-</td><td>-</td><td>.</td><td>.</td></tr>
                                            <tr><td>'</td><td>.</td><td>-</td><td>-</td><td>-</td><td>-</td><td>.</td></tr>
                                            <tr><td>/</td><td>-</td><td>.</td><td>.</td><td>-</td><td>.</td><td></td></tr>
                                            <tr><td>(</td><td>-</td><td>.</td><td>-</td><td>-</td><td>.</td><td></td></tr>
                                            <tr><td>)</td><td>-</td><td>.</td><td>-</td><td>-</td><td>.</td><td>-</td></tr>
                                            <tr><td>:</td><td>-</td><td>-</td><td>-</td><td>.</td><td>.</td><td>.</td></tr>
                                            <tr><td>=</td><td>-</td><td>.</td><td>.</td><td>.</td><td>-</td><td></td></tr>
                                            <tr><td>+</td><td>.</td><td>-</td><td>.</td><td>-</td><td>.</td><td></td></tr>
                                            <tr><td>-</td><td>-</td><td>.</td><td>.</td><td>.</td><td>.</td><td>-</td></tr>
                                            <tr><td>"</td><td>.</td><td>-</td><td>.</td><td>.</td><td>-</td><td>.</td></tr>
                                            <tr><td>@</td><td>.</td><td>-</td><td>-</td><td>.</td><td>-</td><td>.</td></tr>
                                            <tr><td>_</td><td>.</td><td>.</td><td>-</td><td>-</td><td>.</td><td>-</td></tr>
                                            <tr><td>;</td><td>-</td><td>.</td><td>-</td><td>.</td><td>-</td><td>.</td></tr>
                                            <tr><td>&</td><td>.</td><td>-</td><td>.</td><td>.</td><td>.</td><td></td></tr>
                                            <tr><td>!</td><td>-</td><td>.</td><td>-</td><td>.</td><td>-</td><td>-</td></tr>
                                            <tr><td>#</td><td>.</td><td>-</td><td>.</td><td>-</td><td>.</td><td>.</td></tr>                       
                                        </table>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Title>Disclaimer</Title>
                            <div>
                            This website is just a demo so things could change/break at any time.
                            Test everything out and a production ready website will hopefully be ready soon.
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={24} md={{span: 12, offset:0}} style={{border:"1px solid black", padding:"0.5rem", borderRadius:"1rem"}} >
                    <Title>Examples</Title>
                    <Tabs
                        type="card"
                        items={items}
                    />
                </Col>
                
            </Row>
        </div>
    );
};
