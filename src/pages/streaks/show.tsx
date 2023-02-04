import { useShow, IResourceComponentsProps, useOne } from "@pankod/refine-core";

import {
    Show,
    Typography,
    MarkdownField,
    Space,
    ImageField,
    Alert,
    Button,
    ListButton,
    EditButton,
    RefreshButton,
} from "@pankod/refine-antd";

import { IStreak } from "interfaces";
import { useState } from "react";

const { Title, Text } = Typography;

export const StreakShow: React.FC<IResourceComponentsProps> = () => {
    const [isDeprecated, setIsDeprecated] = useState(false);

    const { queryResult } = useShow<IStreak>({
        liveMode: "manual",
        onLiveEvent: () => {
            setIsDeprecated(true);
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data;


    const handleRefresh = () => {
        queryResult.refetch();
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

            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Name</Title>
            <Text>{record?.name}</Text>

            <Title level={5}>Word</Title>
            <Text>{record?.word}</Text>

        </Show>
    );
};
