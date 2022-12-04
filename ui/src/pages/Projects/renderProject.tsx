import ReactHtmlParser from 'react-html-parser';
import variables from "../../helper/variables";
import Project from "../../models/Project";
import { Prism } from "@mantine/prism";

export function renderProject(project: Project) {
  return ReactHtmlParser(project.body, {
    preprocessNodes(nodes) {
      // Replace anything inside {{var}} with the value of the var
      function parse(node: any) {
        if (node.type === "text" && node.data.includes("{{") && node.data.includes("}}")) {
          node.data = node.data?.replace(/{{(.*?)}}/g, (match: string, p1: string) => {
            if (p1 in variables) {
              return variables[p1 as keyof typeof variables]?.toString() ?? "";
            }
            return match;
          });
        }
        else if (node.children?.length > 0) {
          node.children = node.children.map(parse);
        }

        return node;
      }

      nodes.forEach(parse);

      return nodes;
    },
    transform(node) {
      if (node.type === "tag" && node.name === "pre" && node.children?.length > 0 && node.children[0].type === "tag" && node.children[0].name === "code") {
        let code: string = node.children[0].children[0].data ?? "";
        let codeLines = code.split("\n");
        let language = "clike";
        if (codeLines.length > 0 && /<(\w+)>/g.test(codeLines[0])) {
          language =  codeLines[0].trim().replace(/^<(\w+?)>$/g, "$1");
          codeLines.shift();
          code = codeLines.join("\n");
        }
        
        return (
          <Prism language={language as any} onCopy={
            (_code) => {
              navigator.clipboard.writeText(code);
            }}>
            {code}
          </Prism>
        );
      }
    }
  });
}
