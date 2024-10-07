import { Flex, Text } from "@radix-ui/themes";
import { InfoStatStyles } from "./infoStat.css";

export const InfoStat: React.FC<{ label: string; value: string }> = ({
    label,
    value,
}) => {
    return (
        <Flex direction="column" className={InfoStatStyles.container}>
            <Text className={InfoStatStyles.label}>{label}</Text>
            <Text size={"5"} className={InfoStatStyles.value}>
                {value}
            </Text>
        </Flex>
    );
};
