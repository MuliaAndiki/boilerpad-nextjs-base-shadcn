import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/utils/classname";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, XCircle, ChevronDown, XIcon, WandSparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";

const multiSelectVariants = cva("m-1 transition ease-in-out", {
    variants: {
        variant: {
            default: "border-foreground/10 text-foreground bg-card hover:bg-card/80",
            secondary: "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
            inverted: "inverted",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

type SelectBaseProps = {
    placeholder?: string;
    options?: {
        value: string;
        label: string;
        icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
    }[];
    selectedValueRender?: (option: {
        value: string;
        label: string;
        icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
    }) => React.ReactNode;
    baseClassName?: string;
    labelClassName?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onValueChange?: (value: string[]) => void;
    disabled?: boolean;
    label?: string;
    id?: string;
    value?: string;
    defaultValue?: string | string[];
    multiple?: boolean;
    variant?: VariantProps<typeof multiSelectVariants>["variant"];
    animation?: number;
    maxCount?: number;
};

export default function Autocomplete({
    placeholder,
    baseClassName,
    onChange,
    onValueChange,
    disabled,
    label,
    id,
    defaultValue,
    options = [],
    selectedValueRender,
    labelClassName,
    multiple,
    variant,
    animation = 0,
    maxCount = 3,
}: SelectBaseProps) {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(
        multiple ? (defaultValue as string[]) || [] : []
    );
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);

    React.useEffect(() => {
        if (
            multiple &&
            Array.isArray(defaultValue) &&
            JSON.stringify(selectedValues) !== JSON.stringify(defaultValue)
        ) {
            setSelectedValues(defaultValue);
        }
    }, [multiple, defaultValue, selectedValues]);

    if (!multiple) {
        return (
            <div className="flex flex-col gap-2">
                {label && (
                    <label className={cn("text-zinc-800 text-sm font-medium", labelClassName)} htmlFor={id}>
                        {label}
                    </label>
                )}
                <div className={cn("relative w-full", baseClassName)}>
                    <Select
                        autoComplete="off"
                        defaultValue={defaultValue as string}
                        onValueChange={(value: string) => {
                            const e = { target: { value } } as React.ChangeEvent<HTMLInputElement>;
                            onChange?.(e);
                        }}
                        disabled={disabled}
                    >
                        <SelectTrigger className="h-[48px] px-4 outline-none focus-visible:ring-transparent focus:ring-transparent focus:border-purple-500 border-2 border-gray-100 rounded-lg text-gray-800">
                            {placeholder && !defaultValue ? (
                                <span className="text-gray-400 text-base">{placeholder}</span>
                            ) : (
                                <SelectValue placeholder={placeholder} />
                            )}
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            {options?.map((option, index) => (
                                <SelectItem key={index} value={option.value}>
                                    {selectedValueRender ? selectedValueRender(option) : option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        );
    }

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setIsPopoverOpen(true);
        } else if (event.key === "Backspace" && !event.currentTarget.value) {
            const newSelectedValues = [...selectedValues];
            newSelectedValues.pop();
            setSelectedValues(newSelectedValues);
            onValueChange?.(newSelectedValues);
        }
    };

    const toggleOption = (value: string) => {
        const newSelectedValues = selectedValues.includes(value)
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues, value];
        setSelectedValues(newSelectedValues);
        onValueChange?.(newSelectedValues);
    };

    const handleClear = () => {
        setSelectedValues([]);
        onValueChange?.([]);
    };

    const handleTogglePopover = () => {
        setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
        const newSelectedValues = selectedValues.slice(0, maxCount);
        setSelectedValues(newSelectedValues);
        onValueChange?.(newSelectedValues);
    };

    const toggleAll = () => {
        if (selectedValues.length === options.length) {
            handleClear();
        } else {
            const allValues = options.map((option) => option.value);
            setSelectedValues(allValues);
            onValueChange?.(allValues);
        }
    };

    const allSelected = selectedValues.length === options.length;

    return (
        <div className="flex flex-col gap-2">
            {label && <label className={cn("text-zinc-800 text-sm font-medium", labelClassName)}>{label}</label>}
            <div className={cn("relative w-full", baseClassName)}>
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            onClick={handleTogglePopover}
                            className="flex w-full p-1 rounded-lg border-2 border-gray-100 min-h-10 h-auto items-center justify-between bg-white hover:bg-white focus:border-purple-500"
                            disabled={disabled}
                        >
                            {selectedValues.length > 0 ? (
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex flex-wrap items-center">
                                        {allSelected ? (
                                            <span className="pl-4">All</span>
                                        ) : (
                                            selectedValues.slice(0, maxCount).map((value) => {
                                                const option = options.find((o) => o.value === value);
                                                const IconComponent = option?.icon as React.ComponentType<{
                                                    className?: string;
                                                }>;
                                                return (
                                                    <Badge
                                                        key={value}
                                                        className={cn(
                                                            "font-medium",
                                                            isAnimating ? "animate-bounce" : "",
                                                            multiSelectVariants({ variant })
                                                        )}
                                                        style={{ animationDuration: `${animation}s` }}
                                                    >
                                                        {IconComponent && <IconComponent className="h-4 w-4 mr-2" />}
                                                        {option?.label}
                                                        <XCircle
                                                            className="ml-2 h-4 w-4 cursor-pointer hover:scale-110 duration-200"
                                                            onClick={(event) => {
                                                                event.stopPropagation();
                                                                toggleOption(value);
                                                            }}
                                                        />
                                                    </Badge>
                                                );
                                            })
                                        )}
                                        {!allSelected && selectedValues.length > maxCount && (
                                            <Badge
                                                className={cn(
                                                    "bg-transparent text-foreground border-foreground/10 hover:bg-transparent",
                                                    isAnimating ? "animate-bounce" : "",
                                                    multiSelectVariants({ variant })
                                                )}
                                                style={{ animationDuration: `${animation}s` }}
                                            >
                                                {`+ ${selectedValues.length - maxCount} more`}
                                                <XCircle
                                                    className="ml-2 h-4 w-4 cursor-pointer"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        clearExtraOptions();
                                                    }}
                                                />
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <XIcon
                                            className="h-4 mx-2 cursor-pointer text-muted-foreground hover:scale-125 duration-150"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                handleClear();
                                            }}
                                        />
                                        <Separator orientation="vertical" className="flex min-h-6 h-full" />
                                        <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between w-full mx-auto">
                                    <span className="text-base text-gray-400 mx-3">{placeholder}</span>
                                    <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
                                </div>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-[200px] p-0"
                        align="start"
                        onEscapeKeyDown={() => setIsPopoverOpen(false)}
                    >
                        <Command>
                            <CommandInput placeholder="Search..." onKeyDown={handleInputKeyDown} />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    <CommandItem key="all" onSelect={toggleAll} className="cursor-pointer">
                                        <div
                                            className={cn(
                                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                allSelected
                                                    ? "bg-primary text-primary-foreground"
                                                    : "opacity-50 [&_svg]:invisible"
                                            )}
                                        >
                                            <CheckIcon className="h-4 w-4" />
                                        </div>
                                        <span>All</span>
                                    </CommandItem>
                                    {options.map((option) => {
                                        const isSelected = selectedValues.includes(option.value);
                                        const IconComponent = option.icon as React.ComponentType<{
                                            className?: string;
                                        }>;
                                        return (
                                            <CommandItem
                                                key={option.value}
                                                onSelect={() => toggleOption(option.value)}
                                                className="cursor-pointer"
                                            >
                                                <div
                                                    className={cn(
                                                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                        isSelected
                                                            ? "bg-primary text-primary-foreground"
                                                            : "opacity-50 [&_svg]:invisible"
                                                    )}
                                                >
                                                    <CheckIcon className="h-4 w-4" />
                                                </div>
                                                {IconComponent && (
                                                    <IconComponent className="mr-2 h-4 w-4 text-muted-foreground" />
                                                )}
                                                <span>{option.label}</span>
                                            </CommandItem>
                                        );
                                    })}
                                </CommandGroup>
                                <CommandSeparator />
                                <CommandGroup>
                                    <div className="flex items-center justify-between">
                                        {selectedValues.length > 0 && (
                                            <>
                                                <CommandItem
                                                    onSelect={handleClear}
                                                    className="flex-1 justify-center cursor-pointer"
                                                >
                                                    Clear
                                                </CommandItem>
                                                <Separator orientation="vertical" className="flex min-h-6 h-full" />
                                            </>
                                        )}
                                        <CommandSeparator />
                                        <CommandItem
                                            onSelect={() => setIsPopoverOpen(false)}
                                            className="flex-1 justify-center cursor-pointer"
                                        >
                                            Close
                                        </CommandItem>
                                    </div>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                    {animation > 0 && selectedValues.length > 0 && (
                        <WandSparkles
                            className={cn(
                                "cursor-pointer my-2 text-foreground bg-background w-3 h-3",
                                isAnimating ? "" : "text-muted-foreground"
                            )}
                            onClick={() => setIsAnimating(!isAnimating)}
                        />
                    )}
                </Popover>
            </div>
        </div>
    );
}
