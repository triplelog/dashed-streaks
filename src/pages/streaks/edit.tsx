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
    Select,
    Upload,
    useForm,
    useSelect,
} from "@pankod/refine-antd";

import MDEditor from "@uiw/react-md-editor";

import { IStreak } from "interfaces";
import { supabaseClient } from "utility";

export const StreakEdit: React.FC<IResourceComponentsProps> = () => {
    const [isDeprecated, setIsDeprecated] = useState(false);
    const { formProps, saveButtonProps, queryResult } = useForm<IStreak>({
        liveMode: "manual",
        onLiveEvent: () => {
            setIsDeprecated(true);
        },
    });

    const postData = queryResult?.data?.data;
    

    const handleRefresh = () => {
        queryResult?.refetch();
        setIsDeprecated(false);
    };

    return (
        <Edit
            saveButtonProps={saveButtonProps}
            headerProps={{
                extra: (
                    <>
                        <ListButton />
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

            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Word"
                    name="word"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Edit>
    );
};
