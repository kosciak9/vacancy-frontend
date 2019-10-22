import TeamSettings, { teamSettingsTypes } from "store/teamSettings";
import AddTemplateDialog from "components/AddTemplateDialog";

import DropdownSelect from "components/DropdownSelect";
/** @jsx jsx */
import { find, groupBy, reduce, flatten } from "lodash";
import { jsx } from "@emotion/core";
import { setDay, format, parseISO } from "date-fns";

export default function TeamSettingsGroupManager() {
  const { state, dispatch } = TeamSettings.useContainer();
  const currentlyViewed = state.editedTemplateGroup.currentlyViewed;
  const value = find(state.templateGroups.items, { id: currentlyViewed });
  const weekdayGroupedTemplates = groupBy(
    state.editedTemplateGroup.items,
    "weekday"
  );
  const mappedWeekdays = reduce(
    weekdayGroupedTemplates,
    function(result, template, weekday) {
      result.splice(weekday, 0, template);
      return result;
    },
    []
  );

  return (
    <section
      css={theme => ({
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      })}
    >
      <DropdownSelect
        value={value}
        onChange={v =>
          dispatch({
            type: teamSettingsTypes.SET_CURRENTLY_VIEWED,
            payload: v.id
          })
        }
        items={state.templateGroups.items}
        label="Select TemplateGroup to edit:"
      />
      {value && (
        <div
          css={theme => ({
            border: "1px solid rgba(0, 0, 0, 0.3)",
            margin: theme.spacing(2),
            padding: theme.spacing(2),
            boxSizing: "border-box",
            width: `calc(100% - ${theme.spacing(2)}px)`
          })}
        >
          <AddTemplateDialog
            teamId={state.settings.id}
            templateGroupId={currentlyViewed}
          />
          <div
            css={theme => ({
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr"
            })}
          >
            {flatten(
              mappedWeekdays.map((weekdayItems, weekdayIndex) => (
                <div key={weekdayIndex}>
                  <ul>
                    {format(
                      // in Ruby, 0-indexed week means: 0 - Monday, 1 - Tuesday...
                      // in JS it's: 0 - Sunday, 1 - Monday...
                      // so we're adjusting to the backend, +1'ing weekday to help with the offset
                      setDay(new Date(), weekdayIndex + 1, { weekStartsOn: 1 }),
                      "eeee"
                    )}
                    {weekdayItems.map(template => (
                      <li key={template.id}>
                        {format(parseISO(template.from), "HH:mm")} -{" "}
                        {format(parseISO(template.to), "HH:mm")}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
}
