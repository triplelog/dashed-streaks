import { IResourceComponentsProps } from "@pankod/refine-core";

import {
    List,
    Table,
    useTable,
    Space,
    EditButton,
    ShowButton,
    getDefaultSortOrder,
    FilterDropdown,
    Select,
    useSelect,
} from "@pankod/refine-antd";

import { IStreak } from "interfaces";

export const StreakList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<IStreak>({
        initialSorter: [
            {
                field: "word",
                order: "asc",
            },
        ],
        metaData: {
            select: "*",
        },
    });


    return (
        <List>
            <Table {...tableProps} rowKey="id">
                
                <Table.Column
                    key="name"
                    dataIndex="name"
                    title="Name"
                    sorter
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
                    key="dot"
                    dataIndex="dot"
                    title="Dot Task"
                    sorter
                />
                <Table.Column
                    key="dash"
                    dataIndex="dash"
                    title="Dash Task"
                    sorter
                />
                <Table.Column<IStreak>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
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
