<?php

class __blinkdesign_29906e37039b708078d8fe98dec5ec2d extends Mustache_Template
{
    public function renderInternal(Mustache_Context $context, $indent = '', $escape = false)
    {
        $buffer = '';

        $buffer .= $indent . '<section>';
        $buffer .= "\n";
        $buffer .= $indent . '    <h1 class="hdr hdr-page">Blog</h1>';
        $buffer .= "\n";
        $buffer .= "\n";
        // 'blog_posts' section
        $buffer .= $this->section5137bc2370a39059e7b9ca0481a02911($context, $indent, $context->find('blog_posts'));
        $buffer .= $indent . '</section>';
        $buffer .= "\n";

        if ($escape) {
            return htmlspecialchars($buffer, ENT_COMPAT, 'UTF-8');
        } else {
            return $buffer;
        }
    }

    private function section5137bc2370a39059e7b9ca0481a02911(Mustache_Context $context, $indent, $value) {
        $buffer = '';
        if (!is_string($value) && is_callable($value)) {
            $source = '
        {{> excerpt}}
    ';
            $buffer .= $this->mustache
                ->loadLambda((string) call_user_func($value, $source))
                ->renderInternal($context, $indent);
        } elseif (!empty($value)) {
            $values = $this->isIterable($value) ? $value : array($value);
            foreach ($values as $value) {
                $context->push($value);
                if ($partial = $this->mustache->loadPartial('excerpt')) {
                    $buffer .= $partial->renderInternal($context, '        ');
                }
                $context->pop();
            }
        }
    
        return $buffer;
    }
}