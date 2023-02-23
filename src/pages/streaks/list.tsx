import { IResourceComponentsProps } from "@pankod/refine-core";

import {
    List,
    Table,
    useTable,
    Space,
    DeleteButton,
    EditButton,
    ShowButton,
    getDefaultSortOrder,
    FilterDropdown,
    Checkbox,
    Typography,
    Select,
    useSelect,
} from "@pankod/refine-antd";
const { Title, Text } = Typography;
import { IStreak } from "interfaces";

export const StreakList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<IStreak>({
        initialSorter: [
            {
                field: "start",
                order: "desc",
            },
        ],
       /* initialFilter: [
            {
                field: "type",
                operator: "eq",
                value: "day",
            },
        ],*/
        metaData: {
            select: "*",
        },
    });


    return (
        
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    key="type"
                    dataIndex="type"
                    title="Freq."
                    render={(value) => {
                        if (value == "day"){return <Text>Daily</Text>}
                        else if (value == "week"){return <Text>Weekly</Text>}
                        else {return <Text>Monthly</Text>}
                    }}
                    sorter
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Checkbox.Group>
                                <Checkbox value="day" defaultChecked={true}>Daily</Checkbox>
                                <Checkbox value="week" defaultChecked={true}>Weekly</Checkbox>
                                <Checkbox value="month" defaultChecked={true}>Monthly</Checkbox>
                            </Checkbox.Group>
                        </FilterDropdown>
                    )}
                />
                <Table.Column
                    key="word"
                    dataIndex="word"
                    title="Goal Phrase"
                    sorter
                />
                <Table.Column
                    key="progressphrase"
                    dataIndex="progressphrase"
                    title="Progress"
                    sorter
                />
                <Table.Column
                    key="name"
                    dataIndex="name"
                    title="Description"
                    sorter
                />
                <Table.Column<IStreak>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <DeleteButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
            
        </List>
        
    );
};
