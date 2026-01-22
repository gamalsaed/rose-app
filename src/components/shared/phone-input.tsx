"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utilits/cn";
type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
    errorMessage?: string;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, value, errorMessage, ...props }, ref) => {
      const [isFocused, setIsFocused] = React.useState(false);
      const t = useTranslations("register");
      return (
        <div
          className={`flex flex-col gap-1.5 w-full  group group  rounded-md  `}
        >
          <p>{t("phone.label")}</p>
          <label
            className={cn(
              props.disabled && "border-none outline-none",
              "group overflow-hidden duration-200 w-full rounded-md border border-zinc-300 dark:border-zinc-600",
              "transition-colors",
              !isFocused &&
                "group-hover:border-zinc-400 dark:group-hover:border-zinc-500",
              isFocused && "border-maroon-600 dark:border-softPink-400",
              errorMessage &&
                errorMessage !== "register" &&
                " !border-red-600 dark:!border-red-500",
            )}
          >
            <RPNInput.default
              ref={ref}
              className={cn("flex", className)}
              flagComponent={FlagComponent}
              countrySelectComponent={CountrySelect}
              inputComponent={InputComponent}
              smartCaret={false}
              value={value || undefined}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              isFocus={isFocused}
              /**
               * Handles the onChange event.
               *
               * react-phone-number-input might trigger the onChange event as undefined
               * when a valid phone number is not entered. To prevent this,
               * the value is coerced to an empty string.
               *
               * @param {E164Number | undefined} value - The entered value
               */
              onChange={(value) => onChange?.(value || ("" as RPNInput.Value))}
              {...props}
            />
          </label>
          <p className="text-red-600 dark:text-red-500 text-sm font-normal ">
            {errorMessage && errorMessage !== "register" && errorMessage}
          </p>
        </div>
      );
    },
  );
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { isFocus: boolean }
>(({ className, isFocus, ...props }, ref) => (
  <Input
    className={cn(
      "border-0 outline-none ring-0",
      " rounded-none  text-zinc-800 dark:text-zinc-50",
      "dark:text-zinc-50",
      className,
    )}
    {...props}
    autoFocus={isFocus}
    ref={ref}
  />
));
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover
      open={isOpen}
      modal
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) setSearchValue("");
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          className="flex gap-2 w-3/12  border-none rounded-none disabled:bg-zinc-100   ring-0 focus:z-10 bg-white dark:bg-zinc-700 hover:bg-white font-mono "
          disabled={disabled}
          onMouseDown={(e) => e.preventDefault()}
        >
          <FlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />
          <div className="text-zinc-950 dark:text-zinc-50">
            <span>{selectedCountry}</span>
            <span>
              (+
              {RPNInput.getCountryCallingCode(
                selectedCountry === undefined ? "EG" : selectedCountry,
              )}
              )
            </span>
          </div>
          <ChevronsUpDown
            className={cn(
              "-mr-2 size-4 opacity-50 text-gray-500 ",
              disabled ? "hidden" : "opacity-100",
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            value={searchValue}
            onValueChange={(value) => {
              setSearchValue(value);
              setTimeout(() => {
                if (scrollAreaRef.current) {
                  const viewportElement = scrollAreaRef.current.querySelector(
                    "[data-radix-scroll-area-viewport]",
                  );
                  if (viewportElement) {
                    viewportElement.scrollTop = 0;
                  }
                }
              }, 0);
            }}
            placeholder="Search country..."
          />
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className="h-72">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                      onSelectComplete={() => setIsOpen(false)}
                    />
                  ) : null,
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
  onSelectComplete: () => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}: CountrySelectOptionProps) => {
  const handleSelect = () => {
    onChange(country);
    onSelectComplete();
  };
  return (
    <CommandItem className="gap-2" onSelect={handleSelect}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-sm text-foreground/50">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
      <CheckIcon
        className={`ml-auto size-4 ${country === selectedCountry ? "opacity-100" : "opacity-0"}`}
      />
    </CommandItem>
  );
};
const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <div className="overflow-hidden h-3 w-3 rounded-full">
      <span className="flex h-4 w-4 rounded-full overflow-hidden -translate-x-0.5 -translate-y-0.5  [&_svg:not([class*='size-'])]:size-full">
        {Flag && <Flag title={countryName} />}
      </span>
    </div>
  );
};

export { PhoneInput };
