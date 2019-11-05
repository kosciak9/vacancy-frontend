import TeamSettings, { teamSettingsTypes } from "store/teamSettings";
import AddTemplateDialog from "components/AddTemplateDialog";

/** @jsx jsx */
import { groupBy, reduce, flatten } from "lodash";
import { jsx } from "@emotion/core";
import { setDay, format, parseISO } from "date-fns";
import IconButton from "components/IconButton";
import { Trash } from "react-feather";
import wretch from "wretch";
import Login from "store/login";

export default function TeamSettingsGroupManager() {
  const { state, dispatch } = TeamSettings.useContainer();
  const { login } = Login.useContainer();
  const currentlyViewed = state.settings.active_template_id;
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

  const deleteTemplate = async id => {
    await wretch(`/api/template/${id}`)
      .auth(login.token)
      .delete()
      .res();
    dispatch({ type: teamSettingsTypes.REFRESH_TEMPLATES });
  };

  return (
    <section
      css={theme => ({
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      })}
    >
      <div
        css={theme => ({
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr"
        })}
      >
        {flatten(
          mappedWeekdays.map((weekdayItems, weekdayIndex) => (
            <div
              css={theme => ({
                padding: theme.spacing(2),
                margin: theme.spacing(1),
                border: "1px solid rgba(0, 0, 0, 0.3)",
                backgroundColor: theme.palette.backdrop
              })}
              key={weekdayIndex}
            >
              {
                // +1 here is for Array Index offset
                // (Monday is first day of a week and it has 0 index due to way how
                // array's work)
              }
              <h2>{format(setDay(new Date(), weekdayIndex + 1), "eeee")}</h2>
              <ul css={{ listStyleType: "none", margin: 0, padding: 0 }}>
                {weekdayItems.map(template => (
                  <li
                    key={template.id}
                    css={{
                      borderTop: "1px solid rgba(0,0,0,0.1)",
                      borderBottom: "1px solid rgba(0,0,0,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    {format(parseISO(template.from), "HH:mm")} -{" "}
                    {format(parseISO(template.to), "HH:mm")}
                    <IconButton
                      color="grey"
                      message="Remove this template"
                      onClick={() => deleteTemplate(template.id)}
                    >
                      <Trash />
                    </IconButton>
                  </li>
                ))}
              </ul>
              <AddTemplateDialog
                teamId={state.settings.id}
                templateGroupId={currentlyViewed}
                initialWeekday={weekdayIndex}
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
